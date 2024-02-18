import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { authorizationLoginPayload } from 'src/utils/base-64-converted';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizationLoginPayload(authorization);

  if (!loginPayload) {
    throw new NotFoundException('User not found');
  }

  return loginPayload.id;
});
