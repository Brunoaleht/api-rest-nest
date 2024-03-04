import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'name example:',
    example: 'Jogos',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'categoryId',
    example: 2,
  })
  categoryId: number;

  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'description example:',
    example: 'jogo de guerra muito bom',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'price example:',
    example: 10.0,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'image example:',
    example: 'https://www.google.com.br/image.png',
  })
  image: string;
}
