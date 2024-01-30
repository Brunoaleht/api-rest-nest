import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    type: String,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
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

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    type: String || null || undefined,
    example: '58395158326',
  })
  cpf: string;

  @Optional()
  @ApiProperty({
    description: 'The phone confirmation of the user',
    type: String,
    example: '11196985978',
  })
  phone: string;
}
