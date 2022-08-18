import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class change_item_photoURL{
    @Field()
    id: string

    @Field()
    newURL: string
}