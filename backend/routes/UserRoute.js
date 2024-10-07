import express from 'express';
import { User } from '../models/UserModel.js';
import { Appointment } from '../models/AppointmentModel.js';

const router = express.Router();

// Route to get all users
router.get('/', async (request, response) => {
    try {
        const users = await User.find();
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to add a new user
router.post('/add', async (request, response) => {
    const newUser = new User(request.body);
    try {
        const user = await newUser.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Route to get appointments by providerId
router.get('/confirm', async (request, response) => {
    try {
        const id = "6703f67dfc3f06f0324880b4";  // ตัวอย่าง providerId
        const appointments = await Appointment.find();
        response.send(appointments);
    } catch (error) {
        response.status(500).send(error);
    }
});

export default router;
