import dotenv from 'dotenv/config';  // Zorgt ervoor dat omgevingsvariabelen worden geladen
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.js';
import authRouter from './routes/auth.js';  
import propertyRoutes from './routes/properties.js';  
import hostRoutes from './routes/hosts.js'; 
import amenityRoutes from './routes/amenities.js';  
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';

const app = express();
app.use(cors());
app.use(express.json());

// Test route om te zien of de server draait
app.get('/test', (req, res) => {
  res.send('Test werkt!');
});

// Auth route (geen authenticatie vereist)
app.use('/', authRouter);

// Routes zonder globale authenticatie
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/hosts', hostRoutes);
app.use('/amenities', amenityRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);

// Foutafhandelingsroute
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Algemene foutafhandelingsmiddleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

// Start de server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
