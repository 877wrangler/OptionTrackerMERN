import { OptionModel } from "../models/Options.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Home page will display all options
router.get("/", async (req, res) => {
    try {
        // Find and return all options
        const response = await OptionModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    // Creates new OptionModel using request body
    const option = new OptionModel(req.body)
    try {
        // Save new option to database
        const response = await option.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

export {router as optionsRouter};