import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsResolver } from './items.resolver';
import { ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsResolver, ItemsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql"
    })
  ],
})
export class ItemsModule {}
