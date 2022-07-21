import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  balance: number;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  password: string;
  
  @Prop()
  currentItem: string[];

  @Prop()
  biddingItem: string[];

  @Prop()
  winningItem: string[];

  @Prop()
  iconURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);