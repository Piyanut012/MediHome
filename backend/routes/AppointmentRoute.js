import express from "express";
import { Appointment } from "../models/AppointmentModel.js";
import { User } from '../models/UserModel.js';
import moment from 'moment-timezone';

const router = express.Router();

export const getAppointmentsByProvider = async (req, res) => {
  try {
    const providerId = req.params._id; // Assuming provider ID is sent in the request
    const appointments = await Appointment.find(providerId)
      .populate("customerId", "name email phone") // Populate customer name from User model
      .populate("providerId", "name"); // Optionally populate provider name

    console.log(appointments);
    res.status(200).send(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments (backend)", error: err.message });
  }
};

router.get('/provider/:providerId', getAppointmentsByProvider);

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
router.post('/add', async (req, res) => {
    const { customerId, providerId, date, total_price, status } = req.body;

    // Validate input
    if (!customerId || !providerId || !date || !date.startDate || !date.endDate || !total_price || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newAppointment = new Appointment({
        customerId,
        providerId,
        date,
        total_price,
        status,
    });

    try {
        // Save the appointment first
        const savedAppointment = await newAppointment.save();
        
        // Update provider's availability
        const provider = await User.findById(providerId);
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        // Appointment dates
        const appointmentStartDate = new Date(date.startDate);
        const appointmentEndDate = new Date(date.endDate);
        
        const updatedAvailability = [];

        // Loop through the provider's availability
        for (const availability of provider.providerDetails.availability) {
            const startDate = new Date(availability.startDate);
            const endDate = new Date(availability.endDate);

            // Case 1: No overlap with the appointment
            if (appointmentEndDate <= startDate || appointmentStartDate >= endDate) {
                updatedAvailability.push(availability);
            } 
            // Case 2: Overlap with the appointment (booked within availability)
            else {
                // Case 2.1: Before the booked dates
                if (startDate < appointmentStartDate) {
                    updatedAvailability.push({
                        startDate: startDate.toISOString(),
                        endDate: moment(appointmentStartDate).subtract(1, 'days').toISOString(),
                    });
                }
                // Case 2.2: After the booked dates
                if (endDate > appointmentEndDate) {
                    updatedAvailability.push({
                        startDate: moment(appointmentEndDate).add(1, 'days').toISOString(),
                        endDate: endDate.toISOString(),
                    });
                }
                // If there's complete overlap, we do not add it to the availability
            }
        }

        // Update the provider's availability
        provider.providerDetails.availability = updatedAvailability;
        await provider.save();
        
        res.status(201).json(savedAppointment); // Success response
    } catch (error) {
        console.error('Error details:', error); // Log the error details
        res.status(500).json({ error: 'Failed to create appointment', details: error.message }); // Send error message back
    }    
});


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
