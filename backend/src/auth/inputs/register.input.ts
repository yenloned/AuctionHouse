import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class RegisterInput{
  @Field()
  readonly firstname: string;
  @Field()
  readonly lastname: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field()
  readonly confirm_password: string;
}