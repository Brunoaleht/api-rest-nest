import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AddressModule {}
