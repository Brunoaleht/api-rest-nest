import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddressCreatedDto {
  // @IsInt()
  // @IsNotEmpty()
  // @ApiProperty({
  //   type: Number,
  //   required: true,
  //   description: 'userId',
  //   example: 2,
  // })
  // userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'street example:',
    example: 'Rua das flores',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'district example:',
    example: 'District das flores',
  })
  district: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Number example:',
    example: 2,
  })
  numberAddress: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Cep number',
    example: '11999999999',
  })
  cep: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'City id',
    example: 120,
  })
  cityId: number;

  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'complement example:',
    example: 'casa amarela 2 andar',
  })
  complement?: string;
}
