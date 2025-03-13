// src/services/hostService/deleteHost.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const deleteHost = async (id) => {
  try {
    const host = await prisma.host.findUnique({ where: { id: id } });

    if (!host) {
      throw new Error('Host niet gevonden');
    }

    await prisma.host.delete({
      where: { id: id },
    });

    return { message: 'Host succesvol verwijderd' };
  } catch (error) {
    console.log("Fout bij het verwijderen van host:", error);
    throw new Error('Fout bij het verwijderen van host');
  }
};

export default deleteHost;
