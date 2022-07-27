import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
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
    }),
    UsersModule
  ],
})
export class ItemsModule {}
