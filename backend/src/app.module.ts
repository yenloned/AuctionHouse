import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth-users.module';
import { CloudModule } from './cloud/cloud.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql"
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.backend'
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    ItemsModule,
    AuthModule,
    CloudModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
