import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The id of the user',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'email@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String || null || undefined,
    example: 'password',
  })
  password?: string;

  @ApiProperty({
    description: 'The created_at of the user',
    type: Date,
    example: '2021-06-17T17:57:42.000Z',
  })
  created_at?: Date;

  @ApiProperty({
    description: 'The updated_at of the user',
    type: Date || null || undefined,
    example: '2021-06-17T17:57:42.000Z',
  })
  updated_at?: Date | null;
}
