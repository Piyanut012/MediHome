import express from "express";
import { Appointment } from "../models/AppointmentModel.js";

const router = express.Router();

export const getAppointmentsByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId; // Assuming provider ID is sent in the request
    const appointments = await Appointment.find({ providerId })
      .populate("customerId", "name") // Populate customer name from User model
      .populate("providerId", "name"); // Optionally populate provider name

    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err.message });
  }
};

router.get('/provider/:providerId', getAppointmentsByProvider);

export default router;
