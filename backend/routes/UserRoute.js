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
// router.get('/appointment', async (request, response) => {
//     try {
//         console.log()
//         const proviid = '6703f67dfc3f06f0324880b4'
//         const appointments = await Appointment.find({ providerId: proviid});
//         response.status(200).send(appointments);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// Route to get appointments by providerId
router.get('/appointment', async (request, response) => {
    try {
        console.log()
        const proviid = '6703f67dfc3f06f0324880b4'
        const appointments = await Appointment.find({ providerId: proviid, status : 'pending'});
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


// Route to cancel an appointment
router.patch('/appointment/cancel/:id', async (request, response) => {
    const { id } = request.params; // Get appointment ID from URL parameters
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status: 'cancel' }, { new: true });
        if (!updatedAppointment) {
            return response.status(404).send('Appointment not found');
        }
        response.status(200).send(updatedAppointment);
    } catch (error) {
        response.status(500).send(error);
    }
});



// get availability tim
router.get('/avail', async (request, response) => {
    const providerId = '6703f67dfc3f06f0324880b4'; // ใช้ตัวแปร providerId ค่าคงที่

    try {
        const provider = await User.findById(providerId);

        if (!provider) {
            return response.status(404).send({ message: "ไม่พบผู้ให้บริการ" });
        }

        let availability = provider.providerDetails?.availability;

        if (!availability || availability.length === 0) {
            return response.status(404).send({ message: "ไม่พบข้อมูล availability" });
        }

        // เรียงลำดับตามฟิลด์ startDate (จากน้อยไปมาก)
        availability = availability.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        response.status(200).send({ availability }); // ส่งกลับเป็น object
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error); // log ข้อผิดพลาด
        response.status(500).send({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
});


// การเพิ่ม availability time
router.post('/avail', async (request, response) => {
    const providerId = '6703f67dfc3f06f0324880b4';
    const { startDate, endDate } = request.body;

    try {
        const provider = await User.findById(providerId);

        if (!provider) {
            return response.status(404).send({ message: "ไม่พบผู้ให้บริการ" });
        }

        // ตรวจสอบว่ามีไหม
        if (!provider.providerDetails) {
            provider.providerDetails = { availability: [] }; // สร้าง providerDetails ถ้ายังไม่มี
        }

        // เพิ่ม availability ใหม่ลงใน provider
        provider.providerDetails.availability.push({ startDate, endDate });
        await provider.save(); // บันทึกการเปลี่ยนแปลง

        response.status(201).send({ message: "เพิ่ม availability สำเร็จ", availability: { startDate, endDate } });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเพิ่ม availability:", error);
        response.status(500).send({ message: "เกิดข้อผิดพลาดในการเพิ่ม availability" });
    }
});





router.delete('/avail/:availabilityId', async (req, res) => {
    const { availabilityId } = req.params;
    const providerId = '6703f67dfc3f06f0324880b4'; // กำหนด providerId

    try {
        const provider = await User.findById(providerId); // ค้นหาผู้ให้บริการ

        if (!provider) {
            return res.status(404).send({ message: "ไม่พบผู้ให้บริการ" });
        }

        // ลบ availability ที่ตรงตาม ID
        provider.providerDetails.availability = provider.providerDetails.availability.filter(avail => avail._id.toString() !== availabilityId);
        await provider.save(); // บันทึกการเปลี่ยนแปลง

        res.status(200).send({ message: "ลบข้อมูล availability สำเร็จ" });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
        res.status(500).send({ message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
    }
});



export default router;
