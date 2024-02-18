import { ReturnCityDto } from 'src/modules/city/dtos/returnCity.dto';
import { AddressEntity } from '../entity/address.entity';

export class ReturnAddressDto {
  id: number;
  street: string;
  district: string;
  numberAddress: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(addressEntity: AddressEntity) {
    this.id = addressEntity.id;
    this.street = addressEntity.street;
    this.district = addressEntity.district;
    this.numberAddress = addressEntity.numberAddress;
    this.cep = addressEntity.cep;
    this.city = addressEntity.city
      ? new ReturnCityDto(addressEntity.city)
      : null;
  }
}
