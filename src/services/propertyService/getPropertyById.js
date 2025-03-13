// src/services/propertyService/getPropertyById.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getPropertyById = async (id) => {
  try {
    return await prisma.property.findUnique({
      where: { id },
      include: {
        host: true,
        amenities: true,
        bookings: true,
        reviews: true,
      },
    });
  } catch (error) {
    console.error('Fout bij ophalen van accommodatie via ID:', error);
    throw new Error('Fout bij ophalen van accommodatie via ID');
  }
};

export default getPropertyById;
