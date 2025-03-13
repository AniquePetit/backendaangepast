// src/services/hostService/getHostById.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getHostById = async (id) => {
  try {
    const host = await prisma.host.findUnique({
      where: { id: id }
    });

    if (!host) {
      throw new Error('Host niet gevonden');
    }

    return host;
  } catch (error) {
    console.log("Fout bij ophalen van host:", error);
    throw new Error('Fout bij het ophalen van host');
  }
};

export default getHostById;
