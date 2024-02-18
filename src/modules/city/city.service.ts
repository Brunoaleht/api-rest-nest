import { Injectable, NotFoundException } from '@nestjs/common';

import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entity/city.entity';

import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly cacheService: CacheService,
  ) {}

  async getCityId(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`CityId ${cityId} not found`);
    }
    return city;
  }

  async getAllCityByStateId(stateId: number): Promise<CityEntity[]> {
    const cacheKey = `cities-state-${stateId}`;
    return this.cacheService.getCache<CityEntity[]>(cacheKey, () =>
      this.cityRepository.findCitiesByStateId(stateId),
    );
  }
}
