import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ItemsModule } from 'src/items/items.module';
import { ItemsSchema } from 'src/items/items.schema';
import { TasksService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    ScheduleModule.forRoot()
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule {}