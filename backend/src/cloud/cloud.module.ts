import { Module } from "@nestjs/common";
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { CloudinaryProvider } from "./cloud.provider";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
    imports: [NestjsFormDataModule],
    controllers: [CloudController],
    providers: [CloudinaryProvider, CloudService],
})

export class CloudModule {}