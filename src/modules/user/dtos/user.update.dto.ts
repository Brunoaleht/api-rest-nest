import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Nome do usuário',
    example: 'lucas@email.com',
  })
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'CPF number',
    example: '87799999',
  })
  cpf: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone number',
    example: '11999999999',
  })
  phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Email example:',
    example: 'lucas@email.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Password example:',
    example: 'senha456',
  })
  password?: string;
}
