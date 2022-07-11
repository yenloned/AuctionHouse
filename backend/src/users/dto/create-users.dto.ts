import { Int, Field, ObjectType, ID } from "@nestjs/graphql";

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
  @Field(() => [String], { nullable: true })
  readonly biddingItem?: string[];
  @Field(() => [String], { nullable: true })
  readonly winningItem?: string[];
}