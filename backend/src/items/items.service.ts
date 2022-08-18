import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from 'src/activity/activity.schema';
import { User, UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { BidItemInput } from './inputs/bid-item.input';
import { ItemInput } from './inputs/item.input';
import { validBid_result, validCreate_result } from './interface/valid-bid.interface';
import { Item, ItemDocument } from './items.schema';

@Injectable()
export class ItemsService {
    @InjectModel(User.name)
    private userModel: Model<UserDocument>

    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>

    @InjectModel(Activity.name)
    private activityModel: Model<ActivityDocument>

    constructor(
        private usersService: UsersService
    ) {}

    async findAll_item(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async findOne_item(itemID: string): Promise<Item> {
        try{
            return this.itemModel.findOne({"_id": itemID});
        }catch(e){
            return e;
        }
    }

    async change_photoURL(itemID: string, newURL: string): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(itemID, {"$set": {"photo_URL": newURL}})
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async bid_valid(input: BidItemInput): Promise<validBid_result> {
        const itemData = await this.findOne_item(input.item_id)
        const userData = await this.usersService.findOne(input.userID)

        if (!itemData.owner_id) {
            return {
                result: false,
                message: "Submit Failed, item might be expired or not existed."
            };
        }
        if (input.userID === itemData.owner_id){
            return {
                result: false,
                message: "You can not bid for your own item."
            };
        }
        if (input.userID === itemData.bidder_id){
            return {
                result: false,
                message: "You are already the Top Bidder."
            };
        }
        if (input.bid_price < itemData.current_price + itemData.per_price) {
            return {
                result: false,
                message: "Submit Failed, invalid bid amount."
            };
        }
        if (userData.balance < input.bid_price){
            return {
                result: false,
                message: "You do not have enough balance to submit this bid."
            }
        }
        return {
            result: true,
            message: ""
        };
    }

    async bid_item(input: BidItemInput): Promise<Item> {
        try{
            return this.itemModel.findByIdAndUpdate(input.item_id, {
                bidder_id: input.userID,
                bidder_time: input.timestamp,
                current_price: input.bid_price
            });
            
        }catch(e){
            return e;
        }

    }

    //update balance + biddingItem
    async update_user_afterBid(itemID: string, userID: string, bid: number): Promise<User> {
        const userData = await this.userModel.findOne({"_id": userID})
        if(userData.biddingItem.includes(itemID)){
            const all_bid = await this.activityModel.find({user_id: userID, item_id: itemID, action: "bidded"})
            const latest_bid = all_bid[all_bid.length - 1]

            const stacked_bid = bid - latest_bid.bid_price
            return this.userModel.findByIdAndUpdate(userID, {"$inc": {"balance": -stacked_bid}})
        }
        return this.userModel.findByIdAndUpdate(userID, {"$inc": {"balance": -bid}, "$push": {"biddingItem": itemID}})
    }

    async create_valid(input: ItemInput): Promise<validCreate_result> {
        if(input.description.split(' ').length > 200){
            return{
                result: false,
                message: "Description is too long."
            }
        }
        if(input.start_price < 1000){
            return{
                result: false,
                message: "Starting Price is too low."
            }
        }
        if(input.per_price < 100){
            return{
                result: false,
                message: "Bid Increment Price is too low."
            }
        }
        if(new Date(input.end_time).getTime() <= new Date().getTime() || new Date(input.end_time).getTime() <= new Date(input.start_time).getTime()){
            return{
                result: false,
                message: "Invalid End Time, please try again.."
            }
        }
        return{
            result: true,
            message: ""
        }
    }

    async create_item(createItemDto: ItemInput): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    //update currentItem
    async update_user_afterCreate(itemID: string, userID: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(userID, {"$push": {"currentItem": itemID}})
    }
}
