import { AddressEntity } from 'src/modules/address/entity/address.entity';
import { UserTypes } from '../../modules/user/enum/user-type.enum';

export const UserEntityMock = {
  id: 1542154,
  name: 'João Lucas',
  email: 'jolucas@email.com',
  password: 'senha456',
  typeUser: UserTypes.User,
  created_at: new Date(),
  updated_at: new Date(),
  cpf: '999999999',
  phone: '11999999999',
  addresses: [],
};
