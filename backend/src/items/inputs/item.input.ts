import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ItemInput{
    @Field()
    readonly name: string;
    @Field()
    readonly description: string;
    @Field(() => Int)
    readonly start_price: number;
    @Field(() => Int)
    readonly per_price: number;
    @Field(() => Int)
    readonly end_price: number | null;
    @Field(() => Int)
    readonly duration: number;
}