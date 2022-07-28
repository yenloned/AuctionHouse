import { Field, GraphQLTimestamp, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ItemInput{
    @Field()
    readonly name: string;
    @Field()
    readonly description: string;
    //
    @Field()
    readonly owner_id: string
    @Field(() => Int)
    readonly start_price: number;
    @Field(() => Int)
    readonly per_price: number;
    @Field(() => Int, {nullable: true})
    readonly current_price?: number;
    //for testing only
    @Field({nullable: true})
    readonly bidder_id?: string
    @Field(() => Int, {nullable: true})
    readonly end_price?: number;
    @Field(() => GraphQLTimestamp)
    readonly start_time: string;
    @Field(() => GraphQLTimestamp, {nullable: true})
    readonly bidder_time?: string;
    @Field(() => GraphQLTimestamp)
    readonly end_time: string;
    @Field()
    readonly photo_URL: string;
}