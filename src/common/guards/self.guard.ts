import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from "@nestjs/common";
  
  @Injectable()
  export class SelfOrAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log('Guard ishladi, user:', user);
      const targetUserId = +request.params.id;
  
      return user.role === 'ADMIN' || user.id === targetUserId;
    }
  }
  
  