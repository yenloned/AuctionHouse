import { Int, Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class CreateUserDto {
  @Field(() => ID)
  _id: string
  /*
  @Field()
  readonly firstname: string;
  @Field()
  readonly lastname: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  */
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly balance: number;
}