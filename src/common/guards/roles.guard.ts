import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user?.permission?.name) {
      throw new ForbiddenException('Permissão inválida');
    }

    if (!requiredRoles.includes(user.permission.name)) {
      throw new ForbiddenException('Acesso negado');
    }

    return true;
  }
}
