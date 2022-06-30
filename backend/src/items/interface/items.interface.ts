import {Document} from 'mongoose';

export interface Item extends Document {
    readonly name: string;
    readonly description: string;
    readonly start_price: number;
    readonly per_price: number;
    readonly end_price: number;
    readonly duration: number;
    readonly start_time: string;
}