import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressEntity } from './entity/address.entity';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { AddressService } from './address.service';
import { AddressCreatedDto } from './dtos/address.created.dto';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypes } from '../user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles(UserTypes.User)
  @ApiDocGenericPost('address-created', ReturnAddressDto)
  @UsePipes(ValidationPipe)
  async createdAddressByUserId(
    // @Param('userId', ParseIntPipe) userId: number,
    @Body() body: AddressCreatedDto,
    @UserId() userId: number,
  ): Promise<ReturnAddressDto> {
    const addressCreated = await this.addressService.createAddress(
      body,
      userId,
    );
    return new ReturnAddressDto(addressCreated);
  }

  @Get(':userId')
  @Roles(UserTypes.User, UserTypes.Admin)
  @ApiDocGenericGetAll('address-find-userId', ReturnAddressDto)
  async getAddressByUserId(
    // @Param('userId', ParseIntPipe) userId: number,
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    const address = await this.addressService.getAddressByUserId(userId);
    return address.map((address) => new ReturnAddressDto(address));
  }
}
