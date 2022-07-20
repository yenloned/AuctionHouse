import { Field, ObjectType } from "@nestjs/graphql/dist/decorators";

@ObjectType()
export class IconUpload {
    @Field()
    upload_preset: string;

    @Field()
    file: any;

    @Field()
    public_id: string;
}