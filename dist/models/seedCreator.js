"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
const filters = [
    // Filter to not include in the seeds
    {
        keyToFilter: 'password',
        replaceTo: '01dfa4d90d9afbe',
        inTable: 'User',
    },
    { keyToFilter: 'deletedAt' },
    { keyToFilter: 'like', replaceTo: false, inTable: 'CommentAndLike' },
];
const writeTable = async (table, value) => {
    const tableNameCamelCase = table.charAt(0).toLowerCase() + table.slice(1);
    return promises_1.default.writeFile(`./prisma/seeds/${tableNameCamelCase}.ts`, `export const ${tableNameCamelCase} = ${JSON.stringify(value, null, 2)};`);
};
const createSeedFile = (tables) => {
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
            acc[key] = replaceTo;
            return acc;
        }
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
const stackTryAgain = {};
const findAndRefind = async (tables) => {
    const selectsAll = await Promise.allSettled(tables.map((table) => _1.default[table].findMany({ take: 1000 })));
    const merged = selectsAll.reduce((acc, result, i) => {
        if (result.status !== 'fulfilled') {
            stackTryAgain[tables[i]] = (stackTryAgain[tables[i]] || 0) + 1;
            return acc;
        }
        delete stackTryAgain[tables[i]];
        acc[tables[i]] = result.value.map((item) => filterTables(removeNullElements(item), filters, tables[i]));
        return acc;
    }, {});
    return merged;
};
const readAllTables = async ({ allSeeds = false, seedFile = false, logTables = true, } = {}) => {
    const tables = Object.keys(client_1.Prisma.ModelName);
    const merged = await findAndRefind(tables);
    if (Object.keys(stackTryAgain).length > 0) {
        const newMerge = await findAndRefind(Object.keys(stackTryAgain));
        Object.assign(merged, newMerge);
    }
    logTables && console.log('Start -->', merged, '<-- End');
    allSeeds && (await createAllSeeds(merged));
    seedFile && (await createSeedFile(tables));
    return { tables, collections: merged, stackTryAgain };
};
exports.default = { readAllTables };
//# sourceMappingURL=seedCreator.js.map