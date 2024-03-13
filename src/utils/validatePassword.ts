import { compare } from 'bcrypt';

export async function validatePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const isMatch = await compare(password, passwordHash || '');
  return isMatch;
}
