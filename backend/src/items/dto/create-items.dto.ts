import { Int, Field, ObjectType, ID, GraphQLTimestamp } from "@nestjs/graphql";
import { CreateUserDto } from "src/users/dto/create-users.dto";

@ObjectType()
export class CreateItemDto {
  @Field(() => ID)
  _id: string
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  //owner
  @Field(() => [CreateUserDto], {nullable: true})
  readonly owner_data?: CreateUserDto[]
  @Field(() => Int)
  readonly start_price: number;
  @Field(() => Int)
  readonly per_price: number;
  @Field(() => Int, {nullable: true})
  readonly current_price?: number;
  //bidder
  @Field(() => [CreateUserDto], {nullable: 'items'})
  readonly bidder_data?: CreateUserDto[]
  @Field(() => Int, {nullable: true})
  readonly end_price?: number;
  @Field(() => GraphQLTimestamp)
  readonly start_time: string;
  @Field(() => GraphQLTimestamp, {nullable: true})
  readonly bidder_time?: string;
  @Field(() => GraphQLTimestamp)
  readonly end_time: string;
}