import { Request, Response } from 'express';
import userService from '../services/usersService';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.status(200).send(users);
};

export default { getAllUsers };
