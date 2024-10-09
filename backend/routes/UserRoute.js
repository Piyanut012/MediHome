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
router.get('/appointment', async (request, response) => {
    try {
        console.log()
        const proviid = '6703f67dfc3f06f0324880b4'
        const appointments = await Appointment.find({ providerId: proviid});
        response.status(200).send(appointments);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to get appointments by providerId
router.get('/appointment', async (request, response) => {
    try {
        console.log()
        const proviid = '6703f67dfc3f06f0324880b4'
        const appointments = await Appointment.find({ providerId: proviid});
        response.status(200).send(appointments);
    } catch (error) {
        response.status(500).send(error);
    }
});



// Route to confirm an appointment
router.patch('/appointment/confirm/:id', async (request, response) => {
    const { id } = request.params; // Get appointment ID from URL parameters
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true });
        if (!updatedAppointment) {
            return response.status(404).send('Appointment not found');
        }
        response.status(200).send(updatedAppointment);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to delete an appointment
router.delete('/appointment/:id', async (request, response) => {
    const { id } = request.params; // Get appointment ID from URL parameters
    console.log(id)
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return response.status(404).send('Appointment not found');
        }
        response.status(200).send('Appointment deleted successfully');
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/availability', async (request, response) => {
    try {
        const providerId = '6703f67dfc3f06f0324880b4'; // ใช้ตัวแปร providerId
        const provider = await User.findById(providerId); // ค้นหาผู้ให้บริการโดยใช้ findById

        if (!provider) {
            return response.status(404).send({ message: "ไม่พบผู้ให้บริการ" });
        }

        console.log(provider);
        response.status(200).send(provider);
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error); // log ข้อผิดพลาด
        response.status(500).send({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
});


export default router;
