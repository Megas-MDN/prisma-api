"use strict";
/*
    Seed creator v1.0.0 - By Megas
    How to use: Import the seedCreator.ts file and call the readAllTables function
    Ex: import model from './seedCreator';

    model.readAllTables({ allSeeds: true });
    model.readAllTables({ allSeeds: true, seedFile: true, logTables: false });
    Flag: allSeeds --> Create all seeds from all tables inside the ./prisma/seeds folder (create seeds folder if it doesn't exist)
    Flag: seedFile --> Create seed.ts file whit all seeds imported
    Flag: logTables --> Log tables inside the console

    filters array:
    [
      { keyToFilter: 'password', replaceTo: '01dfa4d90d9afbe', inTable: 'User' }, // Filter to not include in the seeds columns password and replaceTo = '01dfa4d90d9afbe' in the table User
      { keyToFilter: 'deletedAt' }, // Filter all keys deletedAt in all tables
      { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' } // Filter all keys like in CommentAndLike table and replaceTo = true
    ] // This array is optional and you can add more filters

    Ex: model.readAllTables({ allSeeds: true, seedFile: true, logTables: false, arrFilters: filters });

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
const prisma = new client_1.PrismaClient();
// Filter to not include in the seeds
const filters = [
// {
//   keyToFilter: 'password',
//   replaceTo: '01dfa4d90d9afbe',
//   inTable: 'User'
// },
// { keyToFilter: 'deletedAt' },
// { keyToFilter: 'like', replaceTo: true, inTable: 'CommentAndLike' }
];
// Ex: User go to user | CommentAndLike go to commentAndLike
const lowerFirst = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
const writeTable = async (table, value) => {
    const tableNameCamelCase = lowerFirst(table);
    return promises_1.default.writeFile(`./prisma/seeds/${tableNameCamelCase}.ts`, `export const ${tableNameCamelCase} = ${JSON.stringify(value, null, 2)};`);
};
const createSeedFile = (tables) => {
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
    return promises_1.default.writeFile('./prisma/seed.ts', fileString);
};
const removeNullElements = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] === null) {
            return acc;
        }
        acc[key] = obj[key];
        return acc;
    }, {});
};
const filteredFields = (obj, filter) => {
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
const filterTables = (obj, filters, key) => {
    return filters.reduce((acc, filter) => {
        if (filter.inTable && filter.inTable !== key) {
            return acc;
        }
        return filteredFields(acc, filter);
    }, obj);
};
const createAllSeeds = async (tables) => {
    await Promise.allSettled(Object.keys(tables).map((key) => {
        writeTable(key, tables[key]);
    }));
};
// Stack to try again -- Tables to re try the find All if some promisse is rejected.
const stackTryAgain = {};
const findAndRefind = async (tables, internalFilters) => {
    const selectsAll = await Promise.allSettled(tables.map((table) => {
        // @ts-expect-error prisma[key]
        return prisma[table].findMany({
            take: 1000,
        });
    }));
    const merged = selectsAll.reduce((acc, result, i) => {
        if (result.status !== 'fulfilled') {
            stackTryAgain[tables[i]] = (stackTryAgain[tables[i]] || 0) + 1;
            return acc;
        }
        delete stackTryAgain[tables[i]];
        acc[tables[i]] = result.value.map((item) => filterTables(removeNullElements(item), internalFilters, tables[i]));
        return acc;
    }, {});
    return merged;
};
const readAllTables = async ({ allSeeds = false, seedFile = false, logTables = true, arrFilters = filters, } = {}) => {
    const tables = Object.keys(client_1.Prisma.ModelName);
    const merged = await findAndRefind(tables, arrFilters);
    const MAX_TRY_AGAIN = 3;
    let breakWhile = 10;
    if (Object.keys(stackTryAgain).length > 0) {
        console.log('\n **************** Go run while ************** \n');
        while (Object.keys(stackTryAgain).length > 0 &&
            Object.values(stackTryAgain).some((v) => v < MAX_TRY_AGAIN) &&
            breakWhile-- > 0) {
            const newMerge = await findAndRefind(Object.keys(stackTryAgain), arrFilters);
            Object.assign(merged, newMerge);
        }
    }
    logTables && console.log('Start -->', merged, '<-- End');
    allSeeds && (await createAllSeeds(merged));
    seedFile && (await createSeedFile(tables));
    return { tables, collections: merged, stackTryAgain };
};
exports.default = { readAllTables };
//# sourceMappingURL=seedCreator.js.map