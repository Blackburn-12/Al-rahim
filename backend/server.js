import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import postRoutes from './routes/postRoutes.js'; // Update this import
import notificationRoutes from './routes/notificationsRoutes.js'; // Update this import
import cors from "cors";
import http from 'http';  // Import http to create server
import { Server } from 'socket.io'; // Import Socket.IO

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize HTTP server with Express app
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow user and admin panel origins
    methods: ["GET", "POST", "PATCH"]
  }
});

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/posts', postRoutes(io)); // Pass `io` to the routes
app.use('/api/notifications', notificationRoutes); // Use notifications routes
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
