import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

// Verwijder een boeking
const deleteBooking = async (id) => {
  return await prisma.booking.delete({
    where: { id: id },
  });
};

export default deleteBooking;
