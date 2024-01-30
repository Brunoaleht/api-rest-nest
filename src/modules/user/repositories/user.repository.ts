import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserInterface } from '../interface/user.interface';
import { UserUpdateDto } from '../dtos/user.update.dto';

@Injectable()
export class UserRepository {
  constructor() {}

  async create(user: UserRegisterDto): Promise<UserInterface> {
    // const newUser = await this.prismaService.user.create({ data: user });
    return await {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '',
      created_at: new Date(),
      updated_at: new Date(),
      cpf: '',
      phone: '',
    };
  }

  async update(userId: number, user: UserUpdateDto): Promise<UserInterface> {
    // const updatedUser = await this.prismaService.user.update({
    //   where: { id: userId },
    //   data: user,
    // });

    return await {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '',
      created_at: new Date(),
      updated_at: new Date(),
      cpf: '',
      phone: '',
    };
  }

  async remove(userId: number): Promise<UserInterface> {
    // return this.users;
    // const deletedUser = await this.prismaService.user.delete({
    //   where: { id: userId },
    // });
    return await {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '',
      created_at: new Date(),
      updated_at: new Date(),
      cpf: '',
      phone: '',
    };
  }

  async findOne(userId: number): Promise<UserInterface> {
    // const foundUser = this.users.find((user) => user.id == userId);
    // const user = await this.prismaService.user.findUnique({
    //   where: { id: userId },
    // });
    return await {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '',
      created_at: new Date(),
      updated_at: new Date(),
      cpf: '',
      phone: '',
    };
  }

  async findAll(): Promise<UserInterface[]> {
    // const users = await this.prismaService.user.findMany();

    return await [
      {
        id: 1,
        name: 'John Doe',
        email: 'test@gmail.com',
        password: '',
        created_at: new Date(),
        updated_at: new Date(),
        cpf: '',
        phone: '',
      },
    ];
  }
}
