import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class CreateItemsDto {
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