import { Field, ObjectType } from "@nestjs/graphql";
import { CreateUserDto } from "src/users/dto/create-users.dto";

@ObjectType()
export class LoginResponse{
  @Field()
  access_token: string;

  //TODO: adding "user"
  @Field(() => CreateUserDto)
  user: {User: CreateUserDto};
}