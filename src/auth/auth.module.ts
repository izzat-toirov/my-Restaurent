import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { JwtGuard } from '../common/guards/user.guard';

import { RolesGuard } from '../common/guards/roles.guard';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Module({
  imports: [JwtModule.register({}), UsersModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, SelfOrRolesGuard, RolesGuard],
  exports: [JwtModule, JwtGuard, SelfOrRolesGuard, RolesGuard],
})
export class AuthModule {}
