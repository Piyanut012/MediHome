import express from 'express';
import { Appointment } from '../models/AppointmentModel.js';
import { User } from '../models/UserModel.js';
import moment from 'moment-timezone';

const router = express.Router();

// Route to get all appointments
router.get('/', async (request, response) => {
    try {
        const appointments = await Appointment.find().populate("providerId", "name nickname");
        response.send(appointments);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to get single appointment
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const appointment =  await Appointment.findById(id);
        response.send(appointment);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to delete single appointment
router.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        console.log(id)
        await Appointment.findByIdAndDelete(id);
        response.json({message: "The appointment has been cancelled"});
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to delete appointment
router.delete('/delete', async (request, response) => {
    try {

    } catch (error) {
        response.status(500).send(error);
    }
})

// Route to delete all appointments
router.delete('/delete', async (req, res) => {
    try {
        await Appointment.deleteMany();
        res.json({ message: 'All appointments deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete appointments' });
    }
});

export default router;
