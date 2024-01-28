import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';

@Injectable()
export class UserService {
  constructor() {}

  async login(user: UserLoginDto): Promise<any> {
    return;
  }

  async register(user: UserRegisterDto): Promise<any> {
    return;
  }

  async getUserById(userId: number): Promise<any> {
    return;
  }

  async getAllUser(): Promise<any> {
    return;
  }
}
