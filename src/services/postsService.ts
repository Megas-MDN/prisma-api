import { PostFromClient } from '../../src/interfaces';
import postsModel from '../../src/models/postsMoldel';

const getAllUsers = async () => {
  const users = await postsModel.getAllUsers();
  return users;
};

const createPost = async (newPost: PostFromClient) => {
  const postToCreate = {
    id: newPost.id,
    title: newPost.title,
    content: newPost.content,
    user_id: newPost.userId,
  };
  const post = await postsModel.createPost(postToCreate);
  return post;
};

export default { getAllUsers, createPost };
