import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
    );

app.listen(3001, () => console.log("Server has started..."));