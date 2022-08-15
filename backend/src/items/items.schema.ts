import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  _id: MongooseSchema.Types.ObjectId;
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
  time_left?: string;
  @Prop()
  photo_URL: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Item);