import mongoose, { Mongoose } from "mongoose";

const appointmentSchema = mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    date: {
      startDate: { type: Date, required: true },  // วันที่เริ่มต้นนัดหมาย
      endDate: { type: Date, required: true }     // วันที่สิ้นสุดนัดหมาย
    },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },  // สถานะการนัดหมาย
  }, { timestamps: true });  // จะเพิ่ม createdAt และ updatedAt ให้โดยอัตโนมัติ
  
export const Appointment = mongoose.model('Appointment', appointmentSchema);
