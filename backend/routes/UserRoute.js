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

export default router;
