import express from 'express';
import { User } from '../models/UserModel.js';

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

// Route to get all providers
router.get('/providers', async (request, response) => {
    try {
        const providers = await User.find({ role: 'ผู้ให้บริการ' });
        response.send(providers);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Route to filter providers by diseases, availability date and price_per_day
router.get('/providers/filter', async (request, response) => {
    const { diseases, date, price } = request.query;
    
    // สร้างเงื่อนไขกรองแบบยืดหยุ่น
    const filter = {
        role: 'ผู้ให้บริการ',
    };

    // ถ้ามีการส่งประเภทโรคมา ให้เพิ่มเงื่อนไขการกรองโรค
    if (diseases) {
        filter['providerDetails.specialized_disease'] = { $in: diseases.split(',') };
    }

    // ถ้ามีการส่งวันที่มา ให้กรองวันที่ที่ผู้ให้บริการว่าง
    if (date) {
        filter['providerDetails.availability.startDate'] = { $lte: new Date(date) };
        filter['providerDetails.availability.endDate'] = { $gte: new Date(date) };
    }

    // ถ้ามีการส่งช่วงราคามา ให้กรองราคาที่น้อยกว่าหรือเท่ากับราคาที่กำหนด
    if (price) {
        filter['providerDetails.price_per_day'] = { $lte: price };
    }

    try {
        const providers = await User.find(filter);
        response.send(providers);
    } catch (error) {
        response.status(500).send(error);
    }
});


// Route to delete all providers
router.delete('/providers', async (request, response) => {
    try {
        const result = await User.deleteMany({ role: 'ผู้ให้บริการ' });
        response.send({ message: `${result.deletedCount} providers deleted successfully` });
    } catch (error) {
        response.status(500).send(error);
    }
});

export default router;
