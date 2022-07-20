
import { Field } from "@nestjs/graphql";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class FormDataTestDto {

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    file: MemoryStoredFile;

    @Field()
    upload_preset: string;

    @Field()
    public_id: string;
    
  }

