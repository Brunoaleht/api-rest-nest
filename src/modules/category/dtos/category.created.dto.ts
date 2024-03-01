import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'name example:',
    example: 'Jogos',
  })
  name: string;

  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'description example:',
    example: 'jogo de guerra muito bom',
  })
  description: string;
}
