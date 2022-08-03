import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { ItemsResolver } from '../items/items.resolver';
import { ItemsSchema } from '../items/items.schema';
import { ItemsService } from '../items/items.service';
import { ActivityResolver } from './activity.resolver';
import { ActivitySchema } from './activity.schema';
import { ActivityService } from './activity.service';

@Module({
  //providers: [ItemsResolver, ItemsService, UsersService, JwtService],
  providers: [ActivityService, ActivityResolver, ItemsResolver, ItemsService, UsersService, JwtService],
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql"
    })
  ],
})
export class ActivityModule {}
