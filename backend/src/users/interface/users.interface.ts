import {Document} from 'mongoose';

export interface User extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly balance: number;
    readonly currentItem?: string[];
    readonly winningItem?: string[];
    readonly iconURL: string;
}