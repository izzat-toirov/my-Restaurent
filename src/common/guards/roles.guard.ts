import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !user.role) {
        throw new ForbiddenException('Foydalanuvchi maʼlumotlari topilmadi');
      }
      const hasRole = requiredRoles.includes(user.role);
  
      if (!hasRole) {
        throw new ForbiddenException('Sizga ruxsat berilmagan');
      }
  
      return true;
    }
  }
  