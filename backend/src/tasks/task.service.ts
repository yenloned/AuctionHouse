import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from 'src/activity/activity.schema';
import { Item, ItemDocument } from 'src/items/items.schema';
import { ItemsService } from 'src/items/items.service';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @InjectModel(Item.name)
  private itemModel: Model<ItemDocument>

  @InjectModel(User.name)
  private userModel: Model<UserDocument>

  @InjectModel(Activity.name)
  private activityModel: Model<ActivityDocument>

  //check every minute
  @Cron('0 */1 * * * *')
  async deleteItem_outdated() {
    Logger.log(`checking for outdated items...`)
    //delete the outdated items in database for every 5 minutes
    const allItem = await this.itemModel.find().exec()
    let deleteItem = []
    allItem.map((eachItem) => {
        const endTime = new Date(eachItem.end_time).getTime();
        const curTime = new Date().getTime();
        if(curTime >= endTime){
            deleteItem.push(eachItem._id)
            Logger.log(`Item ${eachItem._id} is removed due to expired (end_time: ${eachItem.end_time})`)
        }
    })
    const delete_activity = await this.activityModel.deleteMany({item_id: {$in: deleteItem}})
    const delete_item = await this.itemModel.deleteMany({_id: {$in: deleteItem}})
    return {delete_activity, delete_item}
  }
}