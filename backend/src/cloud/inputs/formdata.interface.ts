import { Field, ObjectType } from "@nestjs/graphql/dist/decorators";

export type IconUpload = {
    data: string;
    upload_preset: string;
    public_id: string;
}