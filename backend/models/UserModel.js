import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // ควรเข้ารหัสรหัสผ่าน
    role: { type: String, enum: ['ผู้ให้บริการ', 'ลูกค้า'], required: true },
    name: { type: String, required: true },
    nickname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    providerDetails: {
      experience: { type: Number },  // ประสบการณ์
      price_per_day: { type: Number },  // ราคาให้บริการต่อวัน
      profileImage: { type: String },  // ลิงก์ไปยังรูปโปรไฟล์
      specialized_disease: [String],  // รายการโรคที่เชี่ยวชาญ
      availability: [
        {
          startDate: { type: Date },  // วันที่เริ่มต้นว่าง
          endDate: { type: Date }  // วันที่สิ้นสุดว่าง
        }
      ]
    }
  }, { timestamps: true });  // จะเพิ่ม createdAt และ updatedAt ให้โดยอัตโนมัติ
  
export const User = mongoose.model('User', userSchema);

  