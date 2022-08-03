import { Int, Field, ObjectType, ID, GraphQLTimestamp } from "@nestjs/graphql";
import { CreateUserDto } from "src/users/dto/create-users.dto";
import { CreateItemDto } from "src/items/dto/create-items.dto";

@ObjectType()
export class CreateActivityDto {
  @Field(() => ID)
  _id: string
  @Field()
  readonly action: string;
  @Field()
  readonly timestamp: string;
  //user ID for resolveField
  @Field()
  readonly user_id: string;
  //user data from resolveField
  @Field(() => CreateUserDto, {nullable: true})
  readonly user_data?: CreateUserDto
  //item ID for resolveField
  @Field()
  readonly item_id: string;
  //item data from resolveField
  @Field(() => CreateItemDto, {nullable: true})
  readonly item_data?: CreateItemDto;
  @Field(() => Int)
  readonly bid_price: number;
}