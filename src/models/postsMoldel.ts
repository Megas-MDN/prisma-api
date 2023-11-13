import prisma from './';
import { Post } from '@prisma/client';

const getAllUsers = async () => {
  const users = await prisma.post.findMany();
  return users;
};

const createPost = async (newPost: Post) => {
  const post = await prisma.post.create({
    data: {
      ...newPost,
    },
  });
  return post;
};

export default { getAllUsers, createPost };
