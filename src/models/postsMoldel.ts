import { PostFromClient } from '../../src/interfaces';
import prisma from './';

const getAllUsers = async () => {
  const users = await prisma.post.findMany();
  return users;
};

const createPost = async (newPost: PostFromClient) => {
  const post = await prisma.post.create({
    data: {
      ...newPost,
    },
  });
  return post;
};

export default { getAllUsers, createPost };
