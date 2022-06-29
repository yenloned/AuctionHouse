import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './users.schema';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: "schema.gql"
    })
  ]
})
export class UsersModule {}
