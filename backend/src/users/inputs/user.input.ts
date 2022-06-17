import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserInput{
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly balance: number;
}