import { Field, ObjectType } from "@nestjs/graphql";
import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { CreateUserDto } from "src/users/dto/create-users.dto";
import { CreateItemDto } from "./create-items.dto";

@ObjectType()
export class BidItemDto {
    @Field(() => CreateItemDto, {nullable: true})
    item_result?: CreateItemDto

    @Field(() => CreateUserDto, {nullable: true})
    user_result?: CreateUserDto

    @Field(() => CreateActivityDto, {nullable: true})
    activity_result?: CreateActivityDto

    @Field({nullable: true})
    message?: string

    @Field({nullable: true})
    timestamp?: string
}