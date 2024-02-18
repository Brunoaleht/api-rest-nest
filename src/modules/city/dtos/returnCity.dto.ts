import { ReturnStateDto } from 'src/modules/state/dtos/returnSate.dto';
import { CityEntity } from '../entity/city.entity';

export class ReturnCityDto {
  id: number;
  name: string;
  state?: ReturnStateDto;

  constructor(cityEntity: CityEntity) {
    this.id = cityEntity.id;
    this.name = cityEntity.name;
    this.state = cityEntity.state ? new ReturnStateDto(cityEntity.state) : null;
  }
}
