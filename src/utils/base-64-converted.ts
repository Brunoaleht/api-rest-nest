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
  const decodedPayload = buff.toString('utf-8');

  const parsedPayload = JSON.parse(decodedPayload);

  // Verifica se os campos numéricos podem ser convertidos em strings
  if (!String(parsedPayload.id)) {
    throw new HttpException(
      'User ID should be a string',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Adicione mais verificações aqui conforme necessário para outros campos do payload

  return parsedPayload;
};
