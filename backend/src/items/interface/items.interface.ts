import { Document } from "mongoose";

export interface Items extends Document{
    _id: Number,
    name: String,
    starting_price: Number,
    increment_price: Number,
    end_price: Number,
    Starting_time: Date,
    duration: Number
};