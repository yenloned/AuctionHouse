import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CreateItemDto } from 'src/items/dto/create-items.dto';
import { ItemsService } from 'src/items/items.service';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ActivityInput } from './inputs/activity.input';

@Resolver(() => CreateActivityDto)
export class ActivityResolver {
    constructor(
        private activityService: ActivityService,
        private itemsService: ItemsService,
        private usersService: UsersService,
    ){}

    @Query(() => String)
    async helloActivity(){
        return "fuck activity"
    }

    @Query(() => [CreateActivityDto])
    async findUser_Activity(@Args('id') userid: string){
        return this.activityService.find_activity(userid)
    }

    @Query(() => [CreateActivityDto])
    async findAll_Activity(){
        return this.activityService.findAll_activity()
    }
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

    @Mutation(() => CreateActivityDto)
    async create_Activity(@Args('input') input: ActivityInput){
        return this.activityService.create(input)
    }
    
}