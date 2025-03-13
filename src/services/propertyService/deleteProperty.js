// src/services/propertyService/deleteProperty.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const deleteProperty = async (id, hostId) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (property && property.hostId === hostId) {
      const deletedProperty = await prisma.property.delete({
        where: { id },
      });

      return deletedProperty;
    } else {
      throw new Error('Accommodatie niet gevonden of geen rechten');
    }
  } catch (error) {
    console.error('Fout bij verwijderen van accommodatie:', error);
    throw new Error(`Fout bij verwijderen van accommodatie: ${error.message}`);
  }
};

export default deleteProperty;
