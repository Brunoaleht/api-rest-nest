import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserEntity } from '../entity/user.entity';
import { UserUpdateDto } from '../dtos/user.update.dto';

@Injectable()
export class UserRepository {
  constructor() {}

  async create(user: UserRegisterDto): Promise<UserEntity> {
    // const newUser = await this.prismaService.user.create({ data: user });
    return;
  }

  async update(userId: number, user: UserUpdateDto): Promise<UserEntity> {
    // const updatedUser = await this.prismaService.user.update({
    //   where: { id: userId },
    //   data: user,
    // });

    return;
  }

  async remove(userId: number): Promise<UserEntity> {
    // return this.users;
    // const deletedUser = await this.prismaService.user.delete({
    //   where: { id: userId },
    // });
    return;
  }

  async findOne(userId: number): Promise<UserEntity> {
    // const foundUser = this.users.find((user) => user.id == userId);
    // const user = await this.prismaService.user.findUnique({
    //   where: { id: userId },
    // });
    return;
  }

  async findAll(): Promise<UserEntity[]> {
    // const users = await this.prismaService.user.findMany();

    return;
  }
}
