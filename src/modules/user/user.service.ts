import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserEntity } from './entity/user.entity';
import { UserUpdateDto } from './dtos/user.update.dto';
import { cryptoPassword } from 'src/utils/cryptoPassword';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // async login(user: UserLoginDto): Promise<any> {
  //   return;
  // }

  async register(user: UserRegisterDto): Promise<UserEntity> {
    const passwordHash = await cryptoPassword(user.password);
    const userExists = await this.findUserByEmail(user.email);

    if (userExists) {
      throw new HttpException(
        `User E-mail: ${user.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.create({
      ...user,
      password: passwordHash,
    });
  }

  async remove(userId: number): Promise<DeleteResult> {
    return await this.userRepository.remove(userId);
  }

  async update(userId: number, user: UserUpdateDto): Promise<UpdateResult> {
    const userExists = await this.findUserByEmail(user.email);

    if (userExists) {
      throw new HttpException(
        `User E-mail: ${user.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

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

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User E-mail: ${email} not found`);
    }

    return user;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}
