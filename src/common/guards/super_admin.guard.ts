import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SuperAdminCreateGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user;

    if (!currentUser) {
      throw new UnauthorizedException('Foydalanuvchi aniqlanmadi');
    }

    const currentUserRole = currentUser.role?.toUpperCase();
    const creatingUserRole = request.body?.role?.toUpperCase();


    const rolePermissions = {
      SUPER_ADMIN: ['ADMIN', 'MANAGER'],
      ADMIN: ['ADMIN', 'MANAGER'],
    };

    const allowedRoles = rolePermissions[currentUserRole] || [];

    if (!allowedRoles.includes(creatingUserRole)) {
      throw new ForbiddenException(
        `${currentUserRole} foydalanuvchi ${creatingUserRole} yaratolmaydi`
      );
    }

    if (creatingUserRole === 'SUPER_ADMIN') {
      const superAdminExists = await this.usersService.findByRole('SUPER_ADMIN');
      if (superAdminExists) {
        throw new ForbiddenException('SUPER_ADMIN allaqachon mavjud');
      }

      if (currentUserRole !== 'SUPER_ADMIN') {
        throw new ForbiddenException('SUPER_ADMIN faqat SUPER_ADMIN tomonidan yaratilishi mumkin');
      }
    }

    return true;
  }
}
