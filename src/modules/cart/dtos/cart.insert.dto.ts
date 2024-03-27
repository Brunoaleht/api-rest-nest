import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CartInsertDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'userId',
    example: 2,
  })
  productId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'amount',
    example: 5,
  })
  amount: number;
}
