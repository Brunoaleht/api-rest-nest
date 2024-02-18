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
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginPayloadJwtDto } from './dtos/loginPayloadJwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLogin: LoginDto): Promise<ReturnLoginDto> {
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

    const loginPayload = new LoginPayloadJwtDto(user);

    return {
      accessToken: await this.jwtService.signAsync({ ...loginPayload }),
      email: user?.email,
    };
  }
}
