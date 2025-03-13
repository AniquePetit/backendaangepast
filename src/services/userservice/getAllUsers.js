// services/getAllUsers.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getAllUsers;
