import prisma from './';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export default { getAllUsers };
