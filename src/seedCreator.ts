/*
    Seed creator v1.0.0 - By Megas
    How to use: Import the seedCreator.ts file and call the readAllTables function
    Ex: import model from './seedCreator';

    model.readAllTables({ allSeeds: true });
    model.readAllTables({ allSeeds: true, seedFile: true, logTables: false });
    Flag: allSeeds --> Create all seeds from all tables inside the ./prisma/seeds folder (create seeds folder if it doesn't exist)
    Flag: seedFile --> Create seed.ts file with all seeds imported
    Flag: logTables --> Log tables inside the console

    filters array: 
    [
      { keyToFilter: 'password', replaceTo: '01dfa4d90d9afbe', inTable: 'User' }, // Filter to not include in the seeds columns password and replaceTo = '01dfa4d90d9afbe' in the table User
      { keyToFilter: 'deletedAt' }, // Filter all keys deletedAt in all tables
      { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' } // Filter all keys like in CommentAndLike table and replaceTo = true
    ] // This array is optional and you can add more filters

    Ex: model.readAllTables({ allSeeds: true, seedFile: true, logTables: false, arrFilters: filters });

    prisma[table].findMany({
        take: 1000,
      }); // Limit in 1000 rows
*/

import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

export interface IFilter<T> {
  keyToFilter: string;
  replaceTo?: string | boolean | Date | number | Array<T> | object | undefined;
  inTable?: string;
}

// Filter to not include in the seeds
const filters: IFilter<[]>[] = [
  // {
  //   keyToFilter: 'password',
  //   replaceTo: '01dfa4d90d9afbe',
  //   inTable: 'User'
  // },
  // { keyToFilter: 'deletedAt' },
  // { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' }
];

// Ex: User go to user | CommentAndLike go to commentAndLike
const lowerFirst = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

const writeTable = async (table: string, value: Array<Prisma.ModelName>) => {
  const tableNameCamelCase = lowerFirst(table);
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
      const tableNameCamelCase = lowerFirst(table);
      return `import { ${tableNameCamelCase} } from './seeds/${tableNameCamelCase}';`;
    })
    .join('\n')}

const prisma = new PrismaClient();

async function main() {
  ${tables
    .map((table) => {
      const tableNameCamelCase = lowerFirst(table);
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

const removeNullElements = (obj: object) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key as keyof object] === null) {
      return acc;
    }
    acc[key as keyof object] = obj[key as keyof object];
    return acc;
  }, {} as object);
};

const filteredFields = (obj: object, filter: IFilter<[]>) => {
  const { keyToFilter, replaceTo } = filter;
  return Object.keys(obj).reduce((acc, key) => {
    if (key === keyToFilter) {
      if (replaceTo === undefined) {
        return acc;
      }

      // @ts-expect-error acc[key] = replaceTo
      acc[key] = replaceTo;
      return acc;
    }

    // @ts-expect-error acc[key] = obj[key]
    acc[key] = obj[key];
    return acc;
  }, {});
};

const filterTables = (obj: object, filters: IFilter<[]>[], key: string) => {
  return filters.reduce((acc, filter) => {
    if (filter.inTable && filter.inTable !== key) {
      return acc;
    }
    return filteredFields(acc, filter);
  }, obj) as object;
};

const createAllSeeds = async (tables: { [key: string]: [] }) => {
  await Promise.allSettled(
    Object.keys(tables).map((key) => {
      writeTable(key, tables[key]);
    })
  );
};

// Stack to try again -- Tables to re try the find All if some promisse is rejected.
const stackTryAgain: { [key: string]: number } = {};

const findAndRefind = async (
  tables: string[],
  internalFilters: IFilter<[]>[]
) => {
  const selectsAll = await Promise.allSettled(
    tables.map((table) => {
      // @ts-expect-error prisma[key]
      return prisma[table].findMany({
        take: 1000,
      });
    })
  );

  const merged = selectsAll.reduce((acc, result, i) => {
    if (result.status !== 'fulfilled') {
      stackTryAgain[tables[i]] = (stackTryAgain[tables[i]] || 0) + 1;
      return acc;
    }

    delete stackTryAgain[tables[i]];
    acc[tables[i]] = result.value.map((item: object) =>
      filterTables(
        removeNullElements(item),
        internalFilters,
        tables[i] as string
      )
    );
    return acc;
  }, {} as { [key: string]: [] });

  return merged;
};
const readAllTables = async ({
  allSeeds = false,
  seedFile = false,
  logTables = true,
  arrFilters = filters,
  onlyTables = [] as Array<string>, // only especific tables
} = {}) => {
  const tables =
    onlyTables.length > 0
      ? onlyTables
      : (Object.keys(Prisma.ModelName as Record<string, string>) as string[]);

  const merged = await findAndRefind(tables, arrFilters);

  const MAX_TRY_AGAIN = 3;
  let breakWhile = 10; // safe condition

  if (Object.keys(stackTryAgain).length > 0) {
    console.log('\n **************** Go run while ************** \n');
    while (
      Object.keys(stackTryAgain).length > 0 &&
      Object.values(stackTryAgain).some((v) => v < MAX_TRY_AGAIN) &&
      breakWhile-- > 0
    ) {
      const newMerge = await findAndRefind(
        Object.keys(stackTryAgain) as string[],
        arrFilters
      );
      Object.assign(merged, newMerge);
    }
  }

  logTables && console.log('Start -->', merged, '<-- End');
  allSeeds && (await createAllSeeds(merged));
  seedFile && (await createSeedFile(tables as Array<Prisma.ModelName>));

  return { tables, collections: merged, stackTryAgain };
};

export default { readAllTables };
