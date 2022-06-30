import { Module } from '@nestjs/common';
import { AuthResolver } from './auth-users.resolver';
import { AuthUsersService } from './auth-users.service';

@Module({
  providers: [AuthUsersService, AuthResolver],
  imports: []
})
export class AuthModule {}
