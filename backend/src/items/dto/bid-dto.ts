import { Field, ObjectType } from "@nestjs/graphql";
import { CreateUserDto } from "src/users/dto/create-users.dto";
import { CreateItemDto } from "./create-items.dto";

@ObjectType()
export class BidItemDto {
    @Field(() => CreateItemDto, {nullable: true})
    item_result?: CreateItemDto

    @Field(() => CreateUserDto, {nullable: true})
    user_result?: CreateUserDto

    @Field({nullable: true})
    message?: string
}