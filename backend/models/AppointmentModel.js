import mongoose from "mongoose";
//วางยากูนะอั้ม
const appointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // อ้างถึงลูกค้าที่นัดหมาย
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // อ้างถึงผู้ให้บริการ
    date: {
      startDate: { type: Date, required: true },  // วันที่เริ่มต้นนัดหมาย
      endDate: { type: Date, required: true }     // วันที่สิ้นสุดนัดหมาย
    },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },  // สถานะการนัดหมาย
  }, { timestamps: true });  // จะเพิ่ม createdAt และ updatedAt ให้โดยอัตโนมัติ
  
export const Appointment = mongoose.model('Appointment', appointmentSchema);
