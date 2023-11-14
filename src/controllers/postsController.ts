import { NextFunction, Request, Response } from 'express';
import postsService from '../../src/services/postsService';
import { PostFromClient } from '../../src/interfaces';
import fetchSocket from '../../src/services/fetchService';
const getAllUsers = async (req: Request, res: Response) => {
  const users = await postsService.getAllUsers();
  return res.status(200).send(users);
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, user_id } = req.body;
  if (!title || !content || !user_id) {
    return next({
      status: 400,
      message: 'Filds id, title, contentt, userId are required',
    });
  }
  const newPost: PostFromClient = {
    title,
    content,
    user_id,
  };
  const post = await postsService.createPost(newPost);
  fetchSocket.fetchPostSocket();
  return res.status(201).send(post);
};

export default { getAllUsers, createPost };
