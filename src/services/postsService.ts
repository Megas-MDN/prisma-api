import { PostFromClient } from '../../src/interfaces';
import postsModel from '../models/postsMoldel';

const getAllUsers = async () => {
  const users = await postsModel.getAllUsers();
  return users;
};

const createPost = async (newPost: PostFromClient) => {
  const postToCreate = {
    title: newPost.title,
    content: newPost.content,
    userId: newPost.userId,
  };
  const post = await postsModel.createPost(postToCreate);
  return post;
};

export default { getAllUsers, createPost };
