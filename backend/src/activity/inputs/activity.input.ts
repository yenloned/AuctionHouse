import { Field, GraphQLTimestamp, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ActivityInput{
    @Field()
    readonly user_id: string;
    @Field()
    readonly item_id: string;
    @Field(() => GraphQLTimestamp)
    readonly timestamp: string
    @Field(() => Int, {nullable: true})
    readonly sortedTimestamp: number;
    @Field()
    readonly action: string;    //created / bidded / won
    @Field(() => Int, {nullable: true})
    readonly bid_price?: number
}