import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserEntity } from './entity/user.entity';
import { UserUpdateDto } from './dtos/user.update.dto';
import { cryptoPassword } from 'src/utils/cryptoPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(user: UserLoginDto): Promise<any> {
    return;
  }

  async register(user: UserRegisterDto): Promise<UserEntity> {
    const passwordHash = await cryptoPassword(user.password);
    return await this.userRepository.create({
      ...user,
      password: passwordHash,
    });
  }

  async remove(userId: number): Promise<DeleteResult> {
    return await this.userRepository.remove(userId);
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
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User, userId: ${userId} not found`);
    }
    return user;
  }

  async getUserByIdRelation(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneRelations(userId);
    if (!user) {
      throw new NotFoundException(`User, userId: ${userId} not found`);
    }
    return user;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}
