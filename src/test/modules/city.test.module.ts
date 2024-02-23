import { Module } from '@nestjs/common';
import { CityEntity } from '../../modules/city/entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from '../../modules/city/city.service';
import { CityRepository } from '../../modules/city/repositories/city.repository';

import { CacheModule } from '../../modules/cache/cache.module';
import { StateModule } from '../../modules/state/state.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([CityEntity]), StateModule],
  providers: [CityService, CityRepository],
  exports: [CityService],
})
export class CityTestingModule {}
