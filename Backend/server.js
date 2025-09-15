// server.js or app.js
import express from 'express';
import http from 'http';
import adminRoutes from './routes/adminRoute.js';
import hostelsRoutes from './routes/hostelsRoute.js'; 
import emergencyRoutes from './routes/emergencyRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import userRoutes from './routes/userRoute.js';
import complainsRoutes from './routes/complainsRoute.js';
import facilityRoutes from './routes/facilityRoute.js';
import roomRoutes from './routes/roomRoute.js';
import cors from 'cors';


const app = express();
const server = http.createServer(app);

// ✅ Enable CORS
app.use(cors(
  {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
));

// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Mount routes
app.use('/api/admins', adminRoutes);
app.use('/api/hostels', hostelsRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/complains', complainsRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/room', roomRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
