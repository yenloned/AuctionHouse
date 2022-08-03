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
import { MarketModule } from './market/market.module';
import { ScheduleModule } from "@nestjs/schedule"
import { TasksModule } from './tasks/tasks.module';
import { ActivityModule } from './activity/activity.module';

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
    ScheduleModule.forRoot(),
    UsersModule,
    ItemsModule,
    AuthModule,
    CloudModule,
    MarketModule,
    TasksModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
