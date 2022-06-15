import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsResolver } from './items.resolver';
import { ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

const db_connection: string = process.env.DATABASE_URL

@Module({
    imports: [MongooseModule.forFeature([{ name: "Items name", schema: ItemsSchema }])],
    providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
