
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import connectDB from '../config/db.js';
import authR from '../routes/authR.js'
import cors from 'cors'

// configure env
dotenv.config();

//database config
connectDB();

//rest object
const app= express()

//middlewares
app.use(cors())
app.use(express.json()) //enabling json 
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authR)

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to COAL MINES INDIA</h1>")
})

//port
const PORT = process.env.PORT || 8080;

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Trying port ${port + 1}...`);
            startServer(port + 1); // Retry on the next port
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(PORT);

 
//   const server = app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  
//   server.on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//       console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    
//     server.listen(PORT + 1, () => {
//       console.log(`Server running on port ${PORT + 1}`);
//     });
//     } else {
//       console.error('Server error:', err);
//     }
//   });

  // const dev_mode = ;
//run listen
// app.listen(PORT,()=>{
//     console.log(`Server running on ${process.env.MODE} on ${PORT}`)
// })

//Closing port
// process.on('SIGINT', () => {
//     server.close(() => {
//       console.log('Server shut down');
//       process.exit(0);
//     });
//   });
  

 
