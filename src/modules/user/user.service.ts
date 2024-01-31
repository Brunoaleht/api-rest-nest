import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserEntity } from './entity/user.entity';
import { UserUpdateDto } from './dtos/user.update.dto';
import { cryptoPassword } from 'src/utils/cryptoPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(user: UserLoginDto): Promise<any> {
    return;
  }

  async register(user: UserRegisterDto): Promise<UserEntity> {
    const passwordHash = await cryptoPassword(user.password);
    return await this.userRepository.save({
      ...user,
      password: passwordHash,
    });
  }

  async remove(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }

  async update(userId: number, user: UserUpdateDto): Promise<UpdateResult> {
    if (!user?.password) {
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

  async getUserById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
