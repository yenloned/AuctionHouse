import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemInput } from './inputs/item.input';
import { ItemsService } from './items.service';

@Resolver()
export class ItemsResolver {
    constructor(
        private itemsService: ItemsService
    ){}

    @Query(() => String)
    async helloitems(){
        return "fuck you user"
    }

    @Query(() => [CreateItemDto])
    async items(){
        return this.itemsService.findAll();
    }

    @Mutation(() => CreateItemDto)
    async createItem(@Args('input') input: ItemInput){
        return this.itemsService.create(input);
    }
}
