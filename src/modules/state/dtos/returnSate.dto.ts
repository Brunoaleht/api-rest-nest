import { StateEntity } from '../entity/state.entity';

export class ReturnStateDto {
  id: number;
  name: string;
  ibge: number;

  constructor(stateEntity: StateEntity) {
    this.id = stateEntity.id;
    this.name = stateEntity.name;
    this.ibge = stateEntity.ibge;
  }
}
