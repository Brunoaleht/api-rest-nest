import { Inject, Injectable } from '@nestjs/common';

import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entity/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllCityByStateId(stateId: number): Promise<CityEntity[]> {
    const cacheKey = `cities-state-${stateId}`;
    let cities: CityEntity[] = await this.cacheManager.get(cacheKey);

    if (!cities) {
      cities = await this.cityRepository.findCitiesByStateId(stateId);
      await this.cacheManager.set(cacheKey, cities);
    }
    return cities;
  }
}
