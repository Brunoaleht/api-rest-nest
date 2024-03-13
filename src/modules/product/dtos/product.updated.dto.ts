import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdatedProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'name example:',
    example: 'Jogos',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'categoryId',
    example: 2,
  })
  categoryId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'description example:',
    example: 'jogo de guerra muito bom',
  })
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'price example:',
    example: 10.0,
  })
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'image example:',
    example: 'https://www.google.com.br/image.png',
  })
  image: string;
}
