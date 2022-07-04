import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.schema';
import { AuthResolver } from './auth-users.resolver';
import { AuthUsersService } from './auth-users.service';

@Module({
  providers: [AuthUsersService, AuthResolver],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule]
})
export class AuthModule {}
