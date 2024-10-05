import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Route to get all users
router.get("/", async (request, response) => {
  try {
    const users = await User.find();
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Route to add a new user
router.post('/add', async (request, response) => {
    const newUser = new User(request.body);
    try {
        const user = await newUser.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Route to check if a username is available
router.post("/check-username", async (request, response) => {
  const { username } = request.body;

  try {
    // Check in your database if the username exists
    const user = await User.findOne({ username });

    if (user) {
      return response.json({ isAvailable: false });
    }

    return response.json({ isAvailable: true });
  } catch (error) {
    console.error("Error checking username availability (backend):", error);
    response.status(500).send(error);
  }
});

// Route to check if an email is available
router.post("/check-email", async (request, response) => {
  const { email } = request.body;

  try {
    // Check in your database if the email exists
    const user = await User.findOne({ email });

    if (user) {
      return response.json({ isAvailable: false });
    }

    return response.json({ isAvailable: true });
  } catch (error) {
    console.error("Error checking email availability (backend):", error);
    response.status(500).send(error);
  }
});

// Route to register a new user
router.post("/register", async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.password2 ||
      !request.body.role ||
      !request.body.name ||
      !request.body.email ||
      !request.body.phone ||
      !request.body.age
    ) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(request.body.password2, saltRounds);

    // Create new user with hashed password
    const newUser = {
      username: request.body.username,
      password: hashedPassword, // Store the hashed password
      role: request.body.role,
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      age: request.body.age,
    };

    const user = await User.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.error("Error registering user (backend):", error);
    response.status(500).send("Server error");
  }
});

export default router;
