import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserInterface } from './interface/user.interface';
import { UserRepository } from './repositories/user.repository';
import { UserUpdateDto } from './dtos/user.update.dto';
import { hash } from 'bcrypt';
import { cryptoPassword } from 'src/utils/cryptoPassword';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(user: UserLoginDto): Promise<any> {
    return;
  }

  async register(user: UserRegisterDto): Promise<UserInterface> {
    const passwordHash = await cryptoPassword(user.password);
    return await this.userRepository.create({
      ...user,
      password: passwordHash,
    });
  }

  async remove(userId: number): Promise<UserInterface> {
    return await this.userRepository.remove(userId);
  }

  async update(userId: number, user: UserUpdateDto): Promise<UserInterface> {
    if (!user.password) {
      return await this.userRepository.update(userId, {
        ...user,
      });
    }
    const passwordHash = await cryptoPassword(user?.password);
    return await this.userRepository.update(userId, {
      ...user,
      password: passwordHash,
    });
  }

  async getUserById(userId: number): Promise<UserInterface> {
    return await this.userRepository.findOne(userId);
  }

  async getAllUser(): Promise<UserInterface[]> {
    return await this.userRepository.findAll();
  }
}
