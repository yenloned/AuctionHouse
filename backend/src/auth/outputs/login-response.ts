import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/users.schema";

@ObjectType()
export class LoginResponse{
  @Field()
  access_token: string;

  //TODO: adding "user"
}