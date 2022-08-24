import { Int, Field, ObjectType, ID } from "@nestjs/graphql";
import { CreateItemDto } from "src/items/dto/create-items.dto";

@ObjectType()
export class CreateUserDto {
  @Field()
  _id: string
  @Field()
  readonly firstname: string;
  @Field()
  readonly lastname: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field(() => Int)
  readonly balance: number;
  @Field(() => [String], { nullable: true })
  readonly currentItem?: string[];
  @Field(() => [CreateItemDto], { nullable: true })
  readonly currentItem_data?: CreateItemDto[];
  @Field(() => [String], { nullable: true })
  readonly biddingItem?: string[];
  @Field(() => [CreateItemDto], { nullable: true })
  readonly biddingItem_data?: CreateItemDto[];
  @Field(() => [String], { nullable: true })
  readonly winningItem?: string[];
  @Field()
  readonly iconURL: string;
}