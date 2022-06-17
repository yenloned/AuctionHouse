import { Int, Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class CreateUserDto {
  @Field(() => ID)
  id: string
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly balance: number;
}