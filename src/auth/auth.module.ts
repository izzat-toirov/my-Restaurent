import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { JwtGuard } from '../common/guards/user.guard';
import { SelfOrAdminGuard } from '../common/guards/self.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [JwtModule.register({}), UsersModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, SelfOrAdminGuard, RolesGuard],
  exports: [JwtModule, JwtGuard, SelfOrAdminGuard, RolesGuard],
})
export class AuthModule {}
