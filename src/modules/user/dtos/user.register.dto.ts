import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name user',
    example: 'João Lucas',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email ',
    example: 'exemplo@email.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Password number',
    example: 'exemplodeSenha123',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'CPF number',
    example: '11999999999',
  })
  cpf: string;

  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone number',
    example: '11999999999',
  })
  phone: string;
}
