import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class FindUserInput{
  @Field()
  readonly _id: string;
}