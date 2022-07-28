import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from 'src/users/users.schema';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  owner_id: string;
  @Prop()
  start_price: number;
  @Prop()
  per_price: number;
  @Prop()
  current_price?: number;
  @Prop()
  bidder_id?: string;
  @Prop()
  end_price?: number;
  @Prop()
  start_time: string;
  @Prop()
  bidder_time?: string;
  @Prop()
  end_time: string;
  @Prop()
  photo_URL: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Item);