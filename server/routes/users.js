import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserModel } from '../models/Users.js';

const router = express.Router();
dotenv.config();

router.post('/register', async (req, res) => {
    // Get variables from request body
    const { username, password } = req.body;
    // Search MongoDB collection 'users' where username = a username
    const user = await UserModel.findOne({ username });

    // If user already exists return already exists message
    if (user) {
        return res.json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add username and hashed password to users collection and save
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
});

router.post('/login', async (req, res) => {
    // Get variables from request body
    const { username, password } = req.body;
    // Search MongoDB collection 'users' where username = a username
    const user = await UserModel.findOne({ username });

    
    // If user does not exist
    if (!user) {
        return res.json({ message: "User Doesn't Exist" });
    }
    // Compare password in req body with password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isPasswordValid) {
        return res.json({ message: "Username or password is incorrect!" });
    }
    // Create token, based on users ID encoded with secret string
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    // Response contains token and user ID
    res.json({ token, userID: user._id });
});

export { router as userRouter };