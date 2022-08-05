import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop()
  user_id: string
  @Prop()
  item_id: string
  @Prop()
  timestamp: string
  @Prop()
  sortedTimestamp?: number
  @Prop()
  action: string
  @Prop()
  bid_price?: number
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);