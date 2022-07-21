import { Module } from "@nestjs/common";
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { CloudinaryProvider } from "./cloud.provider";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [CloudController],
    providers: [CloudinaryProvider, CloudService],
})

export class CloudModule {}