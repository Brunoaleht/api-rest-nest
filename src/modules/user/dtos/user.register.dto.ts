import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class UserRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Match('password', { message: 'Password confirmation does not match' })
  passwordConfirmation: string;
}
