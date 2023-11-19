import model from '../models/crudModel';
import { UserTableTypes } from '../interfaces/index';
import { User } from '@prisma/client';

const getAll = async (table: UserTableTypes) => {
  const item = await model.getAll(table);
  return item;
};

const getById = async (table: UserTableTypes, id: string) => {
  const item = await model.getById(table, id);
  return item;
};

const getBy = async (table: UserTableTypes, key: string, value: string) => {
  const item = await model.getBy(table, key, value);
  return item;
};

const create = async (table: UserTableTypes, data: User) => {
  const item = await model.create(table, data);
  return item;
};

const update = async (table: UserTableTypes, id: string, data: User) => {
  const item = await model.update(table, id, data);
  return item;
};

const remove = async (table: UserTableTypes, id: string) => {
  const item = await model.remove(table, id);
  return item;
};

export default { getAll, getById, getBy, create, update, remove };
