import { UserEntity } from 'src/modules/user/entity/user.entity';

export class LoginPayloadJwtDto {
  id: number;
  type: number;
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.type = userEntity.typeUser;
  }
}

export interface ILoginPayloadJwtDto {
  id: number;
  type: number;
}
