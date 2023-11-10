import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import cookieParser from 'cookie-parser';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const cookie = req.headers.get('cookie');
    const parsedCookie = cookieParser.signedCookie(
      cookie,
      process.env.SESSION_SECRET,
    );
    return parsedCookie !== false;
  }
}
