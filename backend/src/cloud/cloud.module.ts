import { Module } from "@nestjs/common";
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';

@Module({
    imports: [],
    controllers: [CloudController],
    providers: [CloudService],
})

export class CloudModule {}