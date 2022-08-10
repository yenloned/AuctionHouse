import { Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class BidItemInput{
    @Field()
    item_id: string

    @Field()
    userID: string

    @Field(() => Int)
    bid_price: number
}