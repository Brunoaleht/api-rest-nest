import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId')
  @ApiDocGenericGetAll('state-get-one-all-cities', CityEntity)
  async getStateById(@Param('stateId') stateId: string): Promise<CityEntity[]> {
    return await this.cityService.getAllCityByStateId(+stateId);
  }
}
