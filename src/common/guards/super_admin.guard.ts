import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { UsersService } from 'src/users/users.service';
  
  @Injectable()
  export class SuperAdminCreateGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const superAdmin = await this.usersService.findByRole('SUPER_ADMIN');
  
      if (superAdmin) {
        throw new ForbiddenException('SUPER_ADMIN allaqachon mavjud');
      }
  
      return true;
    }
  }
  