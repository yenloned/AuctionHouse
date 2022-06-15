import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Items } from './interface/items.interface';
import { CreateItemsDto } from './dto/create-items.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel("inject items") private ItemsModel: Model<Items>) {}

  async create(createCatDto: CreateItemsDto): Promise<Items> {
    const createdCat = new this.ItemsModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Items[]> {
    return this.ItemsModel.find().exec();
  }
}
