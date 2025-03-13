// src/routes/users.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../services/userservice/userservice.js';

const router = express.Router();

// ✅ Publieke route: Haal alle gebruikers op (geen authenticatie nodig)
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Publieke route: Haal een specifieke gebruiker op (geen authenticatie nodig)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'Gebruiker niet gevonden' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Fout bij ophalen van gebruiker' });
  }
});

// ✅ Beveiligde route: Maak een nieuwe gebruiker aan
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userData = req.body;

    // Stel een standaard profielafbeelding in als deze niet meegegeven is
    if (!userData.pictureUrl) {
      userData.pictureUrl = 'https://example.com/default-profile-pic.jpg';
    }

    const newUser = await createUser(userData);  // De createUser functie uit de service aanroepen
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Fout bij het aanmaken van gebruiker:', error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ Beveiligde route: Update een gebruiker
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, pictureUrl } = req.body;

    // Controleer of verplichte velden aanwezig zijn
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: 'Naam, email en telefoonnummer zijn verplicht' });
    }

    const updatedUser = await updateUser(id, { name, email, phoneNumber, pictureUrl });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Gebruiker niet gevonden' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Fout bij bijwerken van gebruiker' });
  }
});

// ✅ Beveiligde route: Verwijder een gebruiker
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);  // Verwijder de gebruiker via de service

    if (!deleted) {
      return res.status(404).json({ message: 'Gebruiker niet gevonden' });
    }

    res.json({ message: 'Gebruiker verwijderd' });
  } catch (error) {
    res.status(500).json({ error: 'Fout bij verwijderen van gebruiker' });
  }
});

export default router;
