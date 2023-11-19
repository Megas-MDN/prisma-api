import { NextFunction, Request, Response } from 'express';
import postsService from '../services/postsService';
import { PostFromClient } from '../../src/interfaces';
import fetchSocket from '../services/fetchService';
const getAllUsers = async (req: Request, res: Response) => {
  const users = await postsService.getAllUsers();
  return res.status(200).send(users);
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return next({
      status: 400,
      message: 'Filds id, title, contentt, userId are required',
    });
  }
  const newPost: PostFromClient = {
    title,
    content,
    userId,
  };
  const post = await postsService.createPost(newPost);
  fetchSocket.fetchPostSocket();
  return res.status(201).send(post);
};

export default { getAllUsers, createPost };
