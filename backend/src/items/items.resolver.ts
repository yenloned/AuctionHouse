import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemInput } from './inputs/item.input';
import { Item } from './items.schema';
import { ItemsService } from './items.service';

@Resolver(() => CreateItemDto)
export class ItemsResolver {
    constructor(
        private itemsService: ItemsService,
        private usersService: UsersService
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

    @Query(() => [CreateItemDto])
    async findAll_items(){
        return this.itemsService.findAll_item()
    }

    @Query(() => CreateItemDto)
    async find_item(@Args('id') id: string){
        return this.itemsService.findOne_item(id)
    }

    @ResolveField(() => CreateUserDto)
    async owner_data(@Parent() itemDto: CreateItemDto){
        const { owner_id } = itemDto;
        return this.usersService.findOne(owner_id)
    }

    @ResolveField(() => CreateUserDto)
    async bidder_data(@Parent() itemDto: CreateItemDto){
        const { bidder_id } = itemDto;
        return this.usersService.findOne(bidder_id)
    }

}
