import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getAllHosts = async (name) => {
  try {
    // Stel een lege zoekquery in
    const query = {
      where: {},
    };

    // Als de naam wordt meegegeven, voeg deze toe aan de zoekquery
    if (name) {
      console.log(`Zoeken naar hosts met naam: ${name}`);  // Log de zoekopdracht
      query.where.name = {
        contains: name.toLowerCase(), // Zorg ervoor dat de zoekopdracht in kleine letters is
      };
    }

    // Voer de query uit en log het resultaat
    const hosts = await prisma.host.findMany(query);
    console.log("Opgehaalde hosts:", hosts);  // Log de opgehaalde hosts

    return hosts;
  } catch (error) {
    console.error("Fout bij ophalen van hosts:", error);  // Log de volledige fout
    throw new Error('Fout bij het ophalen van hosts');
  }
};

export default getAllHosts;
