import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivitySchema } from 'src/activity/activity.schema';
import { ItemsModule } from 'src/items/items.module';
import { ItemsSchema } from 'src/items/items.schema';
import { UserSchema } from 'src/users/users.schema';
import { TasksService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    ScheduleModule.forRoot()
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule {}