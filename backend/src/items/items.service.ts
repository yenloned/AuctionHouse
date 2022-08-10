import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { BidItemInput } from './inputs/bid-item.input';
import { ItemInput } from './inputs/item.input';
import { validBid_result } from './interface/valid-bid.interface';
import { Item, ItemDocument } from './items.schema';

@Injectable()
export class ItemsService {
    @InjectModel(User.name)
    private userModel: Model<UserDocument>

    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>

    //constructor() {}

    async create(createItemDto: ItemInput): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

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

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async bid_valid(input: BidItemInput): Promise<validBid_result> {
        const itemData = await this.findOne_item(input.item_id)

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
        return {
            result: true,
            message: ""
        };
    }

    async bid_item(input: BidItemInput): Promise<Item> {

        try {
            return this.itemModel.findByIdAndUpdate(input.item_id, {
                bidder_id: input.userID,
                bidder_time: new Date(),
                current_price: input.bid_price
            });
            
        } catch (e) {
            return e;
        }

    }

    async update_balance(userID: string, bid: number): Promise<User> {
        return this.userModel.findByIdAndUpdate(userID, {"$inc": {"balance": -bid}})
    }

}
