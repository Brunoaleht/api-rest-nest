import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date | null;
  cpf: string;
  phone: string;
}

export class ProfileDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user associated with this profile',
    type: () => UserDto,
  })
  user: UserDto;

  // Other properties with proper type declarations...
}
