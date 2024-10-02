import dotenv from 'dotenv';
dotenv.config();
// ใช้ค่าจากไฟล์ .env ในการกำหนดค่า PORT และ mongoDBURL
export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL;