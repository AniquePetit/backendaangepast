// src/routes/hosts.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';  // Voeg de middleware toe
import prisma from '../../prisma/prismaClient.js';
// src/routes/hosts.js
import { createHost, getHostById, updateHost, deleteHost, getAllHosts } from '../services/hostService/hostService.js';

const router = express.Router();

// ✅ Haal alle hosts op (zonder authenticatie, met ondersteuning voor queryparameter 'name')
router.get('/', async (req, res) => {
  const { name } = req.query;  // Haal de 'name' queryparameter op

  try {
    // Zoek hosts op basis van de opgegeven queryparameter 'name'
    const hosts = await prisma.host.findMany({
      where: {
        name: name ? { contains: name } : undefined, // Geen 'mode' meer
      },
    });
    
    if (hosts.length === 0) {
      return res.status(404).json({ message: 'Geen hosts gevonden' });
    }

    res.json(hosts);
  } catch (error) {
    console.error('Fout bij het ophalen van hosts:', error);
    res.status(500).json({ message: 'Fout bij ophalen van hosts' });
  }
});

// ✅ Haal één host op via ID (zonder authenticatie)
router.get('/:id', async (req, res) => {
  try {
    // Gebruik getHostById functie van hostService die je hebt geïmporteerd
    const host = await getHostById(req.params.id);  
    res.json(host);  // Response met de opgehaalde host
  } catch (error) {
    console.log('Fout bij ophalen van host:', error);
    res.status(500).json({ message: error.message });  // Stuur een foutmelding naar de client
  }
});

// ✅ Maak een nieuwe host aan (met authenticatie)
router.post('/', authMiddleware, async (req, res) => {  // authMiddleware toegevoegd
  try {
    // Gebruik createHost functie van hostService die je hebt geïmporteerd
    const newHost = await createHost(req.body);  
    res.status(201).json(newHost);  // Response met de aangemaakte host
  } catch (error) {
    console.log('Fout bij het aanmaken van host:', error);
    res.status(400).json({ message: error.message });  // Foutmelding met status 400 als data ontbreekt
  }
});

// ✅ Werk een bestaande host bij (PUT) (met authenticatie)
router.put('/:id', authMiddleware, async (req, res) => {  // authMiddleware toegevoegd
  try {
    // Gebruik updateHost functie van hostService die je hebt geïmporteerd
    const updatedHost = await updateHost(req.params.id, req.body);  
    res.json(updatedHost);  // Response met de bijgewerkte host
  } catch (error) {
    console.log('Fout bij het bijwerken van host:', error);
    res.status(400).json({ message: error.message });  // Foutmelding met status 400 bij ongeldige gegevens
  }
});

// ✅ Verwijder een host (DELETE) (met authenticatie)
router.delete('/:id', authMiddleware, async (req, res) => {  // authMiddleware toegevoegd
  try {
    // Gebruik deleteHost functie van hostService die je hebt geïmporteerd
    const result = await deleteHost(req.params.id);  
    res.json(result);  // Response met het resultaat van de verwijdering
  } catch (error) {
    console.log('Fout bij het verwijderen van host:', error);
    res.status(500).json({ message: error.message });  // Foutmelding bij mislukking
  }
});

export default router;
