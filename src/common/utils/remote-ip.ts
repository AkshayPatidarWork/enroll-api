import { Request } from 'express';

export function remoteIp(req: Request): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress ||
    ''
  );
}
