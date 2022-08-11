import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from 'src/activity/activity.schema';
import { ActivityService } from 'src/activity/activity.service';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { ItemsResolver } from './items.resolver';
import { ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsResolver, ItemsService, UsersService, JwtService, ActivityService],
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql"
    }),
    UsersModule
  ],
})
export class ItemsModule {}
