import { Field, GraphQLTimestamp, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ActivityInput{
    @Field()
    readonly user_id: string;
    @Field()
    readonly item_id: string;
    @Field(() => GraphQLTimestamp)
    readonly timestamp: string
    @Field()
    readonly action: string;
    @Field(() => Int, {nullable: true})
    readonly bid_price?: number
}