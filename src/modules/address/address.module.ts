import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { UserModule } from '../user/user.module';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CityModule } from '../city/city.module';

@Module({
  imports: [CityModule, UserModule, TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressRepository, AddressService],
  exports: [],
})
export class AddressModule {}
