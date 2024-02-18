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

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  @Roles(UserTypes.User)
  @ApiDocGenericPost('address-created', ReturnAddressDto)
  @UsePipes(ValidationPipe)
  async createdAddressByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: AddressCreatedDto,
  ): Promise<ReturnAddressDto> {
    const addressCreated = await this.addressService.createAddress(
      body,
      userId,
    );
    return new ReturnAddressDto(addressCreated);
  }
}
