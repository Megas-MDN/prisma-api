import { NextFunction, Request, Response } from 'express';
import postsService from '../../src/services/postsService';
import { PostFromClient } from '../../src/interfaces';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await postsService.getAllUsers();
  return res.status(200).send(users);
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id, title, content, userId } = req.body;
  if (!id || !title || !content || !userId) {
    return next({
      status: 400,
      message: 'Filds id, title, contentt, userId are required',
    });
  }
  const newPost: PostFromClient = {
    id,
    title,
    content,
    userId,
  };
  const post = await postsService.createPost(newPost);
  return res.status(201).send(post);
};

export default { getAllUsers, createPost };
