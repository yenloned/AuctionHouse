import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './users.schema';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ItemsService } from 'src/items/items.service';
import { ItemsSchema } from 'src/items/items.schema';
import { ActivitySchema } from 'src/activity/activity.schema';

@Module({
  providers: [UsersResolver, UsersService, ItemsService],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: "schema.gql"
    }),
    JwtModule
  ]
})
export class UsersModule {}
