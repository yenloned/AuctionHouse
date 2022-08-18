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
import { ActivityService } from 'src/activity/activity.service';
import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';
import { change_item_photoURL } from './dto/change-items.dto';

@Resolver(() => CreateItemDto)
export class ItemsResolver {
    constructor(
        private itemsService: ItemsService,
        private usersService: UsersService,
        private activityService: ActivityService
    ){}

    @Query(() => [CreateItemDto])
    async items(){
        return this.itemsService.findAll();
    }

    @Query(() => [CreateItemDto])
    async findAll_items(){
        return this.itemsService.findAll_item()
    }

    @Mutation(() => CreateItemDto)
    async change_item_photoURL(@Args('input') input: change_item_photoURL){
        const {id} = input;
        const {newURL} = input;
        return this.itemsService.change_photoURL(id, newURL)
    }

    @Query(() => CreateItemDto)
    async find_item(@Args('id') id: string){
        return this.itemsService.findOne_item(id)
    }
    //layer2
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
    @ResolveField(() => [CreateActivityDto])
    async bidding_activities(@Parent() itemDto: CreateItemDto){
        const { _id } = itemDto;
        const convertedID = _id.toString()
        const result = await this.activityService.find_activity_by_item(convertedID)
        return result
    }
    //layer3
    @ResolveField(() => CreateUserDto)
    async user_data(@Parent() activityDto: CreateActivityDto){
        const { user_id } = activityDto;
        return this.usersService.findOne(user_id)
    }
    @ResolveField(() => CreateItemDto)
    async item_data(@Parent() activityDto: CreateActivityDto){
        const { item_id } = activityDto
        return this.itemsService.findOne_item(item_id)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => BidItemDto)
    async bid_item(@Args('input') input: BidItemInput){
        const validResult = await this.itemsService.bid_valid(input)
        if(validResult.result){
            const user_result = await this.itemsService.update_user_afterBid(input.item_id, input.userID, input.bid_price)
            const item_result = await this.itemsService.bid_item(input)
            const activity_input = {
                user_id: input.userID,
                item_id: input.item_id,
                timestamp: new Date().toString(),
                sortedTimestamp: null,
                action: "bidded",
                bid_price: input.bid_price
            }
            const activity_result = await this.activityService.create(activity_input)
            const timestamp = input.timestamp
            return {item_result, user_result, activity_result, timestamp}
        }else{
            return {message: validResult.message}
        }
    }

    //@UseGuards(JwtAuthGuard)
    @Mutation(() => BidItemDto)
    async createItem(@Args('input') input: ItemInput){
        const validResult = await this.itemsService.create_valid(input)
        if(validResult.result){
            const item_result = await this.itemsService.create_item(input);
            
            const activity_input = {
                user_id: input.owner_id,
                item_id: item_result._id.toString(),//
                timestamp: item_result.start_time,
                sortedTimestamp: null,
                action: "created",
                bid_price: null
            }
            const activity_result = await this.activityService.create(activity_input)
            const user_result = await this.itemsService.update_user_afterCreate(input.owner_id, item_result._id.toString())
            const timestamp = input.start_time
            return {item_result, user_result, activity_result, timestamp}
        }else{
            return {message: validResult.message}
        }
        
    }
}
