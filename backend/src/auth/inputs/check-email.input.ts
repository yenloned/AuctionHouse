import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CheckEmailInput{
  @Field()
  readonly email: string;
}