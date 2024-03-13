import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AddressEntity } from 'src/modules/address/entity/address.entity';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id user',
    example: 1,
  })
  id: number;

  @IsString()
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
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'typeUser example:',
    example: 2,
  })
  typeUser?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Password number',
    example: 'exemplodeSenha123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'CPF number',
    example: '11999999999',
  })
  cpf: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone number',
    example: '11999999999',
  })
  phone?: string;

  @IsDate()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Date of creation',
    example: `${new Date()}`,
  })
  created_at: Date;

  @IsDate()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Date of update',
    example: `${new Date()}`,
  })
  updated_at: Date;

  @IsOptional()
  @ApiProperty({
    type: Array<AddressEntity>,
    required: false,
    description: 'Addresses of user',
    example: [
      { id: 1, street: 'Rua 1', number: 1, city: 'São Paulo', state: 'SP' },
    ],
  })
  addresses?: AddressEntity[];
}
