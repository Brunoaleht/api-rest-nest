import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The name of the user',
    type: String || null || undefined,
    example: 'John Doe',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The phone of the user',
    type: String || null || undefined,
    example: '1185983645839',
  })
  phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'The email of the user',
    type: String || null || undefined,
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The password of the user',
    type: String || null || undefined,
    example: 'password',
  })
  password?: string;
}
