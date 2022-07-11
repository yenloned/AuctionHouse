import { Int, Field, ObjectType} from "@nestjs/graphql";
import { CreateUserDto } from "./create-users.dto";

@ObjectType()
export class JwtDecodeDto {
  @Field()
  readonly username: string
  @Field()
  readonly sub: string;
  @Field(() => Int)
  readonly iat: number;
  @Field(() => Int)
  readonly exp: number;
  @Field(() => [CreateUserDto], {nullable: 'items'})
  userdata: CreateUserDto[]
}