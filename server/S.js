// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authR from '../routes/authR.js';
import connectDB from '../config/db.js';


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// app.use(cors(corsOptions));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Optional: if you want to allow cookies or other credentials
}));
  
// Middlewares
// app.use(cors({
//     origin: 'http://localhost:5174',
// }));
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/v1/auth', authR);

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to COAL MINES INDIA</h1>")
})



//port
const PORT = process.env.PORT || 5000;

const startServer= (port)=> {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Trying port ${port + 1}...`);
            if(port + 1<=65535){
                startServer(port+1)
            }; // Retry on the next port
            
        } else {
            console.error('Server error:', err);
        }
    });
}
// connectDB().then(() => {
    startServer(PORT);
// });
// startServer(PORT);
