import { AddressEntity } from '../entity/address.entity';

export class ReturnAddressDto {
  id: number;
  street: string;
  district: string;
  numberAddress: number;
  cep: string;
  cityId: number;
  userId: number;
  constructor(addressEntity: AddressEntity) {
    this.id = addressEntity.id;
    this.street = addressEntity.street;
    this.district = addressEntity.district;
    this.numberAddress = addressEntity.numberAddress;
    this.cep = addressEntity.cep;
    this.cityId = addressEntity.cityId;
    this.userId = addressEntity.userId;
  }
}
