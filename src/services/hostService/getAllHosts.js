// src/services/hostService/getAllHosts.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getAllHosts = async () => {
  try {
    return await prisma.host.findMany();
  } catch (error) {
    console.log("Fout bij ophalen van hosts:", error);
    throw new Error('Fout bij het ophalen van hosts');
  }
};

export default getAllHosts;
