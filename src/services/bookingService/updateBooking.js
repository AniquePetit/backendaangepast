import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

// Werk een bestaande boeking bij
const updateBooking = async (id, updatedData) => {
  return await prisma.booking.update({
    where: { id: id },
    data: updatedData,
  });
};

export default updateBooking;
