import prisma from './';
import { Prisma } from '@prisma/client';
import fs from 'fs/promises';
import { TableTypes } from '../interfaces/index';

export interface IFilter<T> {
  keyToFilter: string;
  replaceTo?: string | boolean | Date | number | Array<T> | object | undefined;
  inTable?: string;
}

const filters: IFilter<[]>[] = [
  // Filter to not include in the seeds
  {
    keyToFilter: 'password',
    replaceTo: '01dfa4d90d9afbe',
    inTable: 'User',
  },
  { keyToFilter: 'deletedAt' },
  { keyToFilter: 'like', replaceTo: false, inTable: 'CommentAndLike' },
];

const writeTable = async (table: string, value: Array<Prisma.ModelName>) => {
  const tableNameCamelCase = table.charAt(0).toLowerCase() + table.slice(1);
  return fs.writeFile(
    `./prisma/seeds/${tableNameCamelCase}.ts`,
    `export const ${tableNameCamelCase} = ${JSON.stringify(value, null, 2)};`
  );
};

const createSeedFile = (tables: Array<Prisma.ModelName>) => {
  const fileString = `
  import { PrismaClient } from '@prisma/client';
  ${tables
    .map((table) => {
      const tableNameCamelCase = table.charAt(0).toLowerCase() + table.slice(1);
      return `import { ${tableNameCamelCase} } from './seeds/${tableNameCamelCase}';`;
    })
    .join('\n')}

const prisma = new PrismaClient();

async function main() {
  ${tables
    .map((table) => {
      const tableNameCamelCase = table.charAt(0).toLowerCase() + table.slice(1);
      return `await prisma.${tableNameCamelCase}.createMany({
    data: ${tableNameCamelCase},
    skipDuplicates: true,
  });`.trim();
    })
    .join('\n\n')}

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  `.trim();

  return fs.writeFile('./prisma/seed.ts', fileString);
};

const removeNullElements = <T>(obj: T): T => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key as keyof T] === null) {
      return acc;
    }
    acc[key as keyof T] = obj[key as keyof T];
    return acc;
  }, {} as T);
};

const filteredFields = <T, U>(obj: T, filter: IFilter<U>) => {
  const { keyToFilter, replaceTo } = filter;
  return Object.keys(obj).reduce((acc, key) => {
    if (key === keyToFilter) {
      if (replaceTo === undefined) {
        return acc;
      }
      acc[key] = replaceTo;
      return acc;
    }
    acc[key] = obj[key];
    return acc;
  }, {});
};

const filterTables = <T>(obj: T, filters: IFilter<T>[], key: string): T => {
  return filters.reduce((acc, filter) => {
    if (filter.inTable && filter.inTable !== key) {
      return acc;
    }
    return filteredFields(acc, filter);
  }, obj) as T;
};

const createAllSeeds = async (tables: { [key: string]: [] }) => {
  await Promise.allSettled(
    Object.keys(tables).map((key) => {
      writeTable(key, tables[key]);
    })
  );
};

const stackTryAgain: { [key: string]: number } = {};

const findAndRefind = async (tables: string[]) => {
  const selectsAll = await Promise.allSettled(
    tables.map((table) => prisma[table].findMany({ take: 1000 }))
  );

  const merged = selectsAll.reduce((acc, result, i) => {
    if (result.status !== 'fulfilled') {
      stackTryAgain[tables[i]] = (stackTryAgain[tables[i]] || 0) + 1;
      return acc;
    }

    delete stackTryAgain[tables[i]];
    acc[tables[i]] = result.value.map((item) =>
      filterTables(removeNullElements(item), filters, tables[i] as string)
    );
    return acc;
  }, {} as { [key: string]: [] });

  return merged;
};
const readAllTables = async ({
  allSeeds = false,
  seedFile = false,
  logTables = true,
} = {}) => {
  const tables = Object.keys(
    Prisma.ModelName as Record<string, string>
  ) as string[];

  const merged = await findAndRefind(tables);
  if (Object.keys(stackTryAgain).length > 0) {
    const newMerge = await findAndRefind(
      Object.keys(stackTryAgain) as TableTypes[]
    );
    Object.assign(merged, newMerge);
  }

  logTables && console.log('Start -->', merged, '<-- End');
  allSeeds && (await createAllSeeds(merged));
  seedFile && (await createSeedFile(tables as Array<Prisma.ModelName>));

  return { tables, collections: merged, stackTryAgain };
};

export default { readAllTables };
