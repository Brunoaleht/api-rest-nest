import { Module } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityRepository } from './repositories/city.repository';
import { CityController } from './city.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [],
})
export class CityModule {}
