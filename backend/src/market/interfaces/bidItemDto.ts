import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class WS_BidItemDto{
    @Field()
    item_id: string

    @Field()
    item_name: string

    @Field()
    item_icon: string

    @Field()
    userID: string

    @Field(() => Int)
    bid_price: number

    @Field()
    timestamp: string

    @Field()
    email: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    user_id: string

    @Field()
    iconURL: string

    @Field()
    user_iconURL: string
}