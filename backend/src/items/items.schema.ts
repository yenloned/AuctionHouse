import * as mongoose from "mongoose";

export const ItemsSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    starting_price: Number,
    increment_price: Number,
    end_price: Number,
    Starting_time: Date,
    duration: Number
});