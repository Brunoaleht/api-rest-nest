import { Module } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityRepository } from './repositories/city.repository';
import { CityController } from './city.controller';
import { CacheModule } from '../cache/cache.module';
import { StateModule } from '../state/state.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([CityEntity]), StateModule],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityService],
})
export class CityModule {}
