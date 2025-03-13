// src/services/propertyService/updateProperty.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const updateProperty = async (id, hostId, propertyData) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (property && property.hostId === hostId) {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          title: propertyData.title,
          description: propertyData.description,
          location: propertyData.location,
          pricePerNight: propertyData.pricePerNight,
          bedroomCount: propertyData.bedroomCount,
          bathRoomCount: propertyData.bathRoomCount,
          maxGuestCount: propertyData.maxGuestCount,
          rating: propertyData.rating || 0,
        },
      });

      return updatedProperty;
    } else {
      throw new Error('Accommodatie niet gevonden of geen rechten');
    }
  } catch (error) {
    console.error('Fout bij updaten van accommodatie:', error);
    throw new Error(`Fout bij updaten van accommodatie: ${error.message}`);
  }
};

export default updateProperty;
