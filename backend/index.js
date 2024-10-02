import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';


const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Test response
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Test response');
  });

app.use('/user', UserRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to MongoDB');
    }).catch((error) => {
    console.log('Error:', error); 
});