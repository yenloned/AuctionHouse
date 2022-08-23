import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class WS_CreateItemDto{
    @Field()
    user_icon: string

    @Field()
    user_firstname: string

    @Field()
    user_lastname: string

    @Field()
    item_id: string

    @Field()
    item_icon: string

    @Field()
    item_name: string

    @Field()
    timestamp: string
}