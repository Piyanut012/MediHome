import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwtoken from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY =
  "89dea4948ff185c1234c0175331bcfecc87ec03c1ee36f22b1b3579d9b71db2\
  beb46c51bb62c21272420a65b796be5eb2632a5f17e91fc7cf8cad37e177cbc4\
  a139a9779b8c1a8792c95d6ececefd6e7b59b2b2e2df30a21647df53c01d0124\
  d01c7fdde56468546810fe20043df7faf9b1196f4968566d67c86c70cfaeadb2\
  1fa2eb62ce2614a3ac9f67d0545a0026dda79f1a82c5a7709d3cb7109f74f834\
  329331f4d1e10315413cb306108cb53de8a0944991f92350ec3812b082998017\
  e20ce2eedf11e90b2e7db017ce2eb3a56d8a2210219b26809f78c4264df577f0\
  c7f3f9c8cb222896f1454f1ec7609e9cf9651d70cd14e2ffe6ac3dbea3a7bd8b2"; // Replace with your own secret key
const jwt = jwtoken;

const authToken = (request, response, next) => {
  const token = request.headers["authorization"]?.split(" ")[1]; // Extract token from Bearer

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify token
    request.user = decoded; // Store user data in request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    response.status(403).json({ message: "Invalid or expired token" });
  }
};

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
router.post("/add", async (request, response) => {
  const newUser = new User(request.body);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    request.body.password,
    saltRounds
  );

  newUser.password = hashedPassword;
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
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(
    //   request.body.password2,
    //   saltRounds
    // );

    // Create new user with hashed password
    const newUser = {
      username: request.body.username,
      password: request.body.password2, // Store the hashed password
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

// Route to login a user
router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    if (!username || !password) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ error: "Invalid username" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (password != user.password) {
      return response.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT
    const token = jwtoken.sign(
      { userId: user._id, role: user.role }, // Payload (user data)
      SECRET_KEY, // Secret key
      { expiresIn: "4h" } // Token expiration time
    );

    // Login successful, proceed with further logic
    return response
      .status(200)
      .json({ message: "Login successful", token, user: { role: user.role } });
  } catch (error) {
    console.error("Error logging in user (backend):", error);
    response.status(500).send("Server error");
  }
});

router.get("/logged-in", authToken, async (request, response) => {
  try {
    const userId = request.user.userId; // Extracted from the JWT payload
    const user = await User.findById(userId).select("-password"); // Fetch user and exclude password

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.json({ user });
  } catch (error) {
    console.error("Error retrieving user (backend):", error);
    response.status(500).send("Server error");
  }
});

// Route to get all providers
router.get('/providers', async (request, response) => {
    try {
        const providers = await User.find({ role: 'ผู้ให้บริการ' }).select('-username -password');
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
    // if (date) {
    //     filter['providerDetails.availability.startDate'] = { $lte: new Date(date) };
    //     filter['providerDetails.availability.endDate'] = { $gte: new Date(date) };
    // }
    if (date) {
        filter['providerDetails.availability'] = {
            $elemMatch: {
                startDate: { $lte: new Date(date) },
                endDate: { $gte: new Date(date) }
            }
        };
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
