import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/items/items.schema';
import { User, UserDocument } from 'src/users/users.schema';
import { Activity, ActivityDocument } from './activity.schema';
import { ActivityInput } from './inputs/activity.input';

@Injectable()
export class ActivityService {
    @InjectModel(User.name)
    private userModel: Model<UserDocument>

    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>

    @InjectModel(Activity.name)
    private activityModel: Model<ActivityDocument>

    async find_activity_by_user(userid: string): Promise<Activity | Activity[]>{
        return this.activityModel.find({"user_id": userid})
    }

    async find_activity_by_item(itemid: string): Promise<Activity | Activity[]>{
        return this.activityModel.find({"item_id": itemid})
    }

    async findAll_activity(): Promise<Activity[]> {
        return this.activityModel.find().exec()
    }

    async create(createActivity: ActivityInput): Promise<Activity> {
        const createdActivity = new this.activityModel(createActivity)
        return createdActivity.save();
    }
}