import { Inject, Injectable } from '@nestjs/common';

import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entity/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCityByStateId(stateId: number): Promise<CityEntity[]> {
    const cacheKey = `cities-state-${stateId}`;
    return this.cacheService.getCache<CityEntity[]>(cacheKey, () =>
      this.cityRepository.findCitiesByStateId(stateId),
    );
  }
}
