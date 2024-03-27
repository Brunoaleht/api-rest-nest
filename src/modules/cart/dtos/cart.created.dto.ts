import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CartCreatedDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'userId',
    example: 2,
  })
  userId: number;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'active',
    example: true,
  })
  active: boolean;
}
