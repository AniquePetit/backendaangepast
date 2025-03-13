import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';  
import { getAllBookings, createBooking, updateBooking, deleteBooking } from '../services/bookingService/bookingService.js';

const router = express.Router();

// ✅ Haal alle boekingen op zonder userId (publieke toegang)
router.get('/', async (req, res) => {  
  console.log("Verzoek voor boekingen ontvangen zonder userId:", req.query);

  try {
    // Haal alle boekingen op zonder een userId
    const bookings = await getAllBookings();  // Verander hier naar de geïmporteerde getAllBookings functie

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Geen boekingen gevonden' });
    }

    res.json(bookings);  // Stuur de boekingen terug als response
  } catch (error) {
    console.error('Fout bij ophalen van boekingen:', error);
    res.status(500).json({ message: 'Fout bij ophalen van boekingen', error: error.message });
  }
});

// ✅ Maak een nieuwe boeking aan (met authenticatie)
router.post('/', authMiddleware, async (req, res) => {  
  try {
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;

    console.log('Ontvangen body:', req.body);

    if (!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice) {
      return res.status(400).json({ message: 'Alle velden zijn verplicht' });
    }

    const newBooking = await createBooking({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus: bookingStatus || "pending",
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fout bij aanmaken van boeking', error: error.message });
  }
});

// ✅ Werk een bestaande boeking bij (PUT) (met authenticatie)
router.put('/:id', authMiddleware, async (req, res) => {  
  try {
    const id = req.params.id;
    const { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;

    console.log('Ontvangen body voor update:', req.body);

    const updatedBooking = await updateBooking(id, {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fout bij bijwerken van boeking', error: error.message });
  }
});

// ✅ Verwijder een boeking (DELETE) (met authenticatie)
router.delete('/:id', authMiddleware, async (req, res) => {  
  try {
    const id = req.params.id;

    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
      return res.status(400).json({ message: 'Ongeldige ID' });
    }

    const result = await deleteBooking(id);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fout bij verwijderen van boeking', error: error.message });
  }
});

export default router;
