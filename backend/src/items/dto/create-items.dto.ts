import { Int, Field, ObjectType, ID, GraphQLTimestamp } from "@nestjs/graphql";
import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { CreateUserDto } from "src/users/dto/create-users.dto";

@ObjectType()
export class CreateItemDto {
  @Field(() => ID)
  _id: string
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  //ownerID for resolveField
  @Field()
  readonly owner_id: string;
  //owner data from resolveField
  @Field(() => CreateUserDto, {nullable: true})
  readonly owner_data?: CreateUserDto
  @Field(() => Int)
  readonly start_price: number;
  @Field(() => Int)
  readonly per_price: number;
  @Field(() => Int, {nullable: true})
  readonly current_price?: number;
  //bidderID for resolveField
  @Field()
  readonly bidder_id: string;
  //bidder data from resolveField
  @Field(() => CreateUserDto, {nullable: true})
  readonly bidder_data?: CreateUserDto;
  @Field(() => [CreateActivityDto], {nullable: true})
  readonly bidding_activities?: CreateActivityDto[];
  @Field(() => Int, {nullable: true})
  readonly end_price?: number;
  @Field()
  readonly start_time: string;
  @Field({nullable: true})
  readonly bidder_time?: string;
  @Field()
  readonly end_time: string;
  @Field({nullable: true})
  readonly time_left?: string;
  @Field()
  readonly photo_URL: string;
}