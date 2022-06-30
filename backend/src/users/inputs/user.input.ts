import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserInput{
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
}