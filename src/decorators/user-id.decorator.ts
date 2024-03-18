import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { authorizationLoginPayload } from 'src/utils/base-64-converted';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  // Obtém o cabeçalho de autorização da solicitação HTTP
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  // Verifica se o cabeçalho de autorização está presente
  if (!authorization) {
    throw new NotFoundException('Authorization header not found');
  }

  // Chama a função para extrair o payload do token JWT
  const loginPayload = authorizationLoginPayload(authorization);

  // Verifica se o payload do login foi extraído com sucesso e se o ID do usuário está presente nele
  if (!loginPayload || !loginPayload.id) {
    throw new NotFoundException('User ID not found in login payload');
  }

  // Retorna o ID do usuário extraído do payload do login
  return loginPayload.id;
});
