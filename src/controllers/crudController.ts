import { NextFunction, Request, Response } from 'express';
import service from '../services/crudService';
import { UserTableTypes } from '../interfaces/index';
import { User } from '@prisma/client';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table } = req.params;
    const users = await service.getAll(table as UserTableTypes.User);
    return res.status(200).send(users);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table, id } = req.params;
    const user = await service.getById(table as UserTableTypes.User, id);
    return res.status(200).send(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

const getBy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table } = req.params;
    const { key, value } = req.query;
    const user = await service.getBy(
      table as UserTableTypes.User,
      `${key}`,
      `${value}`
    );
    return res.status(200).send(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table } = req.params;
    const data = req.body as User;
    const user = await service.create(table as UserTableTypes.User, data);
    return res.status(201).send(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table, id } = req.params;
    const data = req.body as User;
    const user = await service.update(table as UserTableTypes.User, id, data);
    return res.status(200).send(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { table, id } = req.params;
    const user = await service.remove(table as UserTableTypes.User, id);
    return res.status(200).send(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
};

export default { getAll, getById, getBy, create, update, remove };
