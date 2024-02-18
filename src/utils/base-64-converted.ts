import { HttpException, HttpStatus } from '@nestjs/common';
import { ILoginPayloadJwtDto } from 'src/modules/auth/dtos/loginPayloadJwt.dto';

export const authorizationLoginPayload = (
  authorization: string,
): ILoginPayloadJwtDto => {
  const authorizationSplit = authorization.split('.');

  if (authorizationSplit.length < 3 || !authorizationSplit[1]) {
    throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
  }

  const payload = authorizationSplit[1];
  const buff = Buffer.from(payload, 'base64');

  return JSON.parse(buff.toString('ascii'));
};
