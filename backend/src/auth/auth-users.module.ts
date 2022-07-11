import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.schema';
import { AuthResolver } from './auth-users.resolver';
import { AuthUsersService } from './auth-users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthUsersService, AuthResolver, LocalStrategy, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule.forRoot({
      envFilePath: '.env.backend'
    }),
    JwtModule.register({
      signOptions: {expiresIn: '3600s'},
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    PassportModule,
  ]
})
export class AuthModule {}
