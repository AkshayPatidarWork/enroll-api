import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const allowedRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!token) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    try {
      // ✅ Use flat payload
      const user = await this.jwtService.verifyAsync(token);

      if (!user || !user.role) {
        throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
      }

      // ✅ Match user.role (e.g. 'SUPER_ADMIN')
      if (
        allowedRoles &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
      ) {
        throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
      }

      request['user'] = user;
      return true;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error('JWT error:', err);
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
