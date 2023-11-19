import { PostFromClient } from '../../src/interfaces';
import prisma from './';

const getAllUsers = async () => {
  const users = await prisma.post.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
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
