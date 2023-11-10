import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CustomHeaders = createParamDecorator(
  (data: Headers, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.headers[data] : req.headers;
  },
);
