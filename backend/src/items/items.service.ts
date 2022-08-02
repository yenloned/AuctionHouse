import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { ItemInput } from './inputs/item.input';
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
/*
    async findOne_user(userid: string): Promise<User> {
        try{
          return this.userModel.findOne({"_id": userid});
        }catch(e){
          return e
        }
      }
*/
    

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
}
