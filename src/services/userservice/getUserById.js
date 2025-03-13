// services/getUserById.js
// services/userservice/getUserById.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js




const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      username: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getUserById;
