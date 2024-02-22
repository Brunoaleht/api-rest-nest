import { Injectable, NotFoundException } from '@nestjs/common';

import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entity/city.entity';

import { CacheService } from '../cache/cache.service';
import { StateService } from '../state/state.service';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateService: StateService,
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
    const findState = await this.stateService.findOneState(stateId);
    if (!findState) {
      throw new NotFoundException('State not found');
    }
    const cacheKey = `cities-state-${stateId}`;
    return this.cacheService.getCache<CityEntity[]>(cacheKey, () =>
      this.cityRepository.findCitiesByStateId(stateId),
    );
  }
}
