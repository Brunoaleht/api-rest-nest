import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CartProductCreatedDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'cartId',
    example: 2,
  })
  cartId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'productId',
    example: 2,
  })
  productId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'amount',
    example: 6,
  })
  amount: number;
}
