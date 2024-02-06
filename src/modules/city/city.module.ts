import { Module } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityRepository } from './repositories/city.repository';
import { CityController } from './city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [],
})
export class CityModule {}
