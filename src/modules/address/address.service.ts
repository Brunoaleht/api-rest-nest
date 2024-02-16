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
    const user = await this.userService.getUserById(userId);
    const cityExist = await this.cityService.isExistCityId(address?.cityId);
    console.log('cityExist', cityExist);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    } else if (!cityExist) {
      throw new HttpException('City not found', HttpStatus.BAD_REQUEST);
    } else {
      return await this.addressRepository.create(address, userId);
    }
  }

  async getAddressByUserId(userId: number): Promise<AddressEntity[]> {
    return await this.addressRepository.findAddressByUserId(userId);
  }
}
