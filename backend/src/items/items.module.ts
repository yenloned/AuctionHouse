import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { ItemsResolver } from './items.resolver';
import { ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsResolver, ItemsService, UsersService, JwtService],
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql"
    }),
    UsersModule
  ],
})
export class ItemsModule {}
