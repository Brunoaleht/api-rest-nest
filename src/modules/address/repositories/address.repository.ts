import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AddressEntity } from '../entity/address.entity';
import { AddressCreatedDto } from '../dtos/address.created.dto';

export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepositoryTypeOrm: Repository<AddressEntity>,
  ) {}

  async create(
    address: AddressCreatedDto,
    userId: number,
  ): Promise<AddressEntity> {
    return await this.addressRepositoryTypeOrm.save({ ...address, userId });
  }

  async findOne(addressId: number): Promise<any> {
    return await this.addressRepositoryTypeOrm.findOne({
      where: { id: addressId },
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    return await this.addressRepositoryTypeOrm.find({
      where: { userId },
    });
  }
}
