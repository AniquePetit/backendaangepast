// src/services/propertyService/getFilteredProperties.js
import prisma from '../../../prisma/prismaClient.js';  // Relatief pad naar prismaClient.js

const getFilteredProperties = async (query) => {
  try {
    console.log('Zoekparameters ontvangen:', query);  // Log de ontvangen zoekparameters

    // Voorbereiden van de "where" clausule voor de Prisma query
    const where = {};

    // Voeg filters toe op basis van de query
    if (query.pricePerNight) {
      where.pricePerNight = { gte: query.pricePerNight }; // Prijs groter dan of gelijk aan
    }
    if (query.location) {
      where.location = query.location; // Locatie filter
    }
    // Voeg hier eventueel meer filters toe afhankelijk van de zoekparameters

    // Voer de Prisma query uit
    const properties = await prisma.property.findMany({
      where: where,  // Gebruik de dynamisch gebouwde where clausule
    });

    console.log('Gevonden accommodaties:', properties);  // Log de gevonden accommodaties
    return properties;
  } catch (error) {
    // Uitgebreidere foutmelding en logging
    console.error('Fout bij ophalen van accommodaties met zoekparameters:', error.message);
    console.error('Query die mislukte:', query);  // Log de query die mislukte
    throw new Error('Fout bij ophalen van accommodaties met zoekparameters');
  }
};

export default getFilteredProperties;
