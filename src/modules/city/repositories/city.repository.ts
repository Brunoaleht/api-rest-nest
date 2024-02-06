import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CityEntity } from '../entity/city.entity';

export class CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepositoryTypeOrm: Repository<CityEntity>,
  ) {}

  async findOne(cityId: number): Promise<CityEntity> {
    return await this.cityRepositoryTypeOrm.findOne({
      where: { id: cityId },
    });
  }

  async findCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return await this.cityRepositoryTypeOrm.find({
      where: { stateId },
    });
  }
}
