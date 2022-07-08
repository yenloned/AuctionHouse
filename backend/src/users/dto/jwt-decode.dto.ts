import { Int, Field, ObjectType} from "@nestjs/graphql";

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
}