import { UserTableTypes } from '../interfaces/index';
import { User } from '@prisma/client';
import prisma from './';

const getAll = async (table: UserTableTypes) => {
  const items = await prisma[table]?.findMany({
    where: {
      deletedAt: null,
    },
  });
  return items;
};

const getById = async (table: UserTableTypes, id: string) => {
  const item = await prisma[table]?.findUnique({
    where: {
      id,
    },
  });
  return item;
};

const getBy = async (table: UserTableTypes, key: string, value: string) => {
  const item = await prisma[table]?.findUnique({
    where: {
      [key]: value,
    },
  });
  return item;
};

const create = async (table: UserTableTypes, data: User) => {
  const item = await prisma[table]?.create({
    data,
  });
  return item;
};

const update = async (table: UserTableTypes, id: string, data: User) => {
  const item = await prisma[table]?.update({
    where: {
      id,
    },
    data,
  });
  return item;
};

const remove = async (table: UserTableTypes, id: string) => {
  const item = await prisma[table]?.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  return item;
};
export default { getAll, getById, getBy, create, update, remove };
