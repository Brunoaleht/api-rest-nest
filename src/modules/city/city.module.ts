import { Module } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CityModule {}
