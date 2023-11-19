import userModel from '../models/usersModel';

const getAllUsers = async () => {
  const users = await userModel.getAllUsers();
  return users;
};

export default { getAllUsers };
