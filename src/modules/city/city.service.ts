import { Injectable } from '@nestjs/common';

import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entity/city.entity';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async getAllCityByStateId(stateId: number): Promise<CityEntity[]> {
    return await this.cityRepository.findCitiesByStateId(stateId);
  }
}
