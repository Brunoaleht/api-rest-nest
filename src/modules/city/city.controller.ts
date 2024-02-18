import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';
import { ReturnCityDto } from './dtos/returnCity.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId')
  @ApiDocGenericGetAll('state-get-one-all-cities', CityEntity)
  async getStateById(
    @Param('stateId', ParseIntPipe) stateId: number,
  ): Promise<CityEntity[]> {
    return await this.cityService.getAllCityByStateId(+stateId);
  }

  @Get(':cityId/city')
  @ApiDocGenericGetAll('city-get-one', ReturnCityDto)
  async getCityById(
    @Param('cityId', ParseIntPipe) cityId: number,
  ): Promise<ReturnCityDto> {
    const city = await this.cityService.getCityId(+cityId);
    return new ReturnCityDto(city);
  }
}
