import { Int, Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class CreateItemDto {
  @Field(() => ID)
  _id: string
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field(() => Int)
  readonly start_price: number;
  @Field(() => Int)
  readonly per_price: number;
  @Field(() => Int)
  readonly end_price: number | null;
  @Field(() => Int)
  readonly duration: number;
}