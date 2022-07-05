import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.schema';
import { AuthResolver } from './auth-users.resolver';
import { AuthUsersService } from './auth-users.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthUsersService, AuthResolver, LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    PassportModule]
})
export class AuthModule {}
