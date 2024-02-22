import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AddressRepository } from './repositories/address.repository';
import { AddressEntity } from './entity/address.entity';
import { AddressCreatedDto } from './dtos/address.created.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    address: AddressCreatedDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(userId);
    await this.cityService.getCityId(address?.cityId);
    return await this.addressRepository.create(address, userId);
  }

  async getAddressByUserId(userId: number): Promise<AddressEntity[]> {
    await this.userService.getUserById(userId);
    return await this.addressRepository.findAddressByUserId(userId);
  }
}
