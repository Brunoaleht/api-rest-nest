import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserEntity } from '../entity/user.entity';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoryTypeOrm: Repository<UserEntity>,
  ) {}

  async create(user: UserRegisterDto): Promise<UserEntity> {
    return await this.userRepositoryTypeOrm.save({ ...user, typeUser: 1 });
  }

  async update(userId: number, user: UserUpdateDto): Promise<UpdateResult> {
    return await this.userRepositoryTypeOrm.update(userId, {
      ...user,
      typeUser: 1,
    });
  }

  async remove(userId: number): Promise<DeleteResult> {
    return await this.userRepositoryTypeOrm.delete(userId);
  }

  async findOne(userId: number): Promise<UserEntity> {
    return await this.userRepositoryTypeOrm.findOne({ where: { id: userId } });
  }

  async findOneRelations(userId: number): Promise<UserEntity> {
    return await this.userRepositoryTypeOrm.findOne({
      where: { id: userId },
      //outra maneira de fazer relações
      // relations: {
      //   addresses:{
      //     city: {
      //       state: true
      //     }
      //   }
      // }
      relations: ['addresses', 'addresses.city', 'addresses.city.state'],
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepositoryTypeOrm.find();
  }
}
