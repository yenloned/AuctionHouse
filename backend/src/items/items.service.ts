import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { ItemInput } from './inputs/item.input';
import { Item, ItemDocument } from './items.schema';

@Injectable()
export class ItemsService {

    constructor(
    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>, 
    //private usersService: UsersService
    ) {}

    async create(createItemDto: ItemInput): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async findOne(itemID: string): Promise<Item> {
        try{
            return this.itemModel.findOne({"_id": itemID});
        }catch(e){
            return e;
        }
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
}
