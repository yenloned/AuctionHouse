import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/items/items.schema';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @InjectModel(Item.name)
  private itemModel: Model<ItemDocument>

  //every 5 minutes
  @Cron('0 */5 * * * *')
  async deleteItem_outdated() {
    Logger.log(`checking for outdated items...`)
    //delete the outdated items in database for every 5 minutes
    const allItem = await this.itemModel.find().exec()
    let deleteItem = []
    allItem.map((eachItem) => {
        const endTime = new Date(eachItem.end_time).getTime();
        const curTime = new Date().getTime();
        if(curTime >= endTime){
            deleteItem.push(eachItem.end_time)
            Logger.log(`Item ${eachItem._id} is removed due to expired (end_time: ${eachItem.end_time})`)
        }
    })
    return this.itemModel.deleteMany({end_time: {$in: deleteItem}})
  }
}