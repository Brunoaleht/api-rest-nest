import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(userLogin: LoginDto): Promise<UserEntity> {
    const user = await this.userService
      .findUserByEmail(userLogin.email)
      .catch(() => null);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await compare(userLogin.password, user.password || '');
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
