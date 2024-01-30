import { hash } from 'bcrypt';

export async function cryptoPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return await hash(password, saltOrRounds);
}
