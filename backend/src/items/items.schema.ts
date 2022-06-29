import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  start_price: number;
  @Prop()
  per_price: number;
  @Prop()
  end_price: number | null;
  @Prop()
  duration: number;
}

export const ItemsSchema = SchemaFactory.createForClass(Item);