import express from 'express';
import { Appointment } from '../models/AppointmentModel.js';

const router = express.Router();

// Route to get all appointments
router.get('/', async (request, response) => {
    try {
        const appointments = await Appointment.find();
        response.send(appointments);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to add a new appointment
router.post('/add', async (request, response) => {
    const newAppointment = new Appointment(request.body);
    try {
        const appointment = await newAppointment.save();
        response.status(201).send(appointment);
    } catch (error) {
        response.status(400).send(error);
    }
});

export default router;
