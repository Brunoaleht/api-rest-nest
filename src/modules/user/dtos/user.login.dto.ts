import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'email@email.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    type: String || null || undefined,
    example: 'password',
  })
  password: string;
}
