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

    async findAll_activity(): Promise<Activity[]> {
        return this.activityModel.find().exec()
    }

    async create(createActivity: ActivityInput): Promise<Activity> {
        const createdActivity = new this.activityModel(createActivity)
        return createdActivity.save();
    }
}