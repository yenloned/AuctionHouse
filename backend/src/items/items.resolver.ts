import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { BidItemInput } from './inputs/bid-item.input';
import { CreateItemDto } from './dto/create-items.dto';
import { ItemInput } from './inputs/item.input';
import { Item } from './items.schema';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { BidItemDto } from './dto/bid-dto';

@Resolver(() => CreateItemDto)
export class ItemsResolver {
    constructor(
        private itemsService: ItemsService,
        private usersService: UsersService
    ){}

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

    @UseGuards(JwtAuthGuard)
    @Mutation(() => BidItemDto)
    async bid_item(@Args('input') input: BidItemInput){
        const validResult = await this.itemsService.bid_valid(input)
        if(validResult.result){
            const item_result = this.itemsService.bid_item(input)
            const user_result = this.itemsService.update_balance(input.userID, input.bid_price)

            return {item_result, user_result}
        }else{
            return {message: validResult.message}
        }
    }
}
