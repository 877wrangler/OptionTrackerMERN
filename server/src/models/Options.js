import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: false,
    },
    strike: {
        type: Number,
        required: false,
    },
    purchaseDate: {
        type: Date,
        required: false,
    },
    expDate: {
        type: Date,
        required: false,
    },
    collateral: {
        type: Number,
        required: false,
    },
    credit: {
        type: Number,
        required: false,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    }
})

export const OptionModel = mongoose.model('options', OptionSchema);