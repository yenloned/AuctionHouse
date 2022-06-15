import { InputType, Field } from "type-graphql"

@InputType()
export class ItemsInput{
    @Field()
    _id: number
    @Field()
    name: string
    @Field()
    starting_price: number
    @Field()
    increment_price: number
    @Field()
    end_price: number
    @Field()
    starting_time: Date
    @Field()
    duration: number
}