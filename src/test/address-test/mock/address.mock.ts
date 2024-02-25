export const AddressMockEntity = {
  id: 1,
  userId: 2,
  complement: 'casa amarela 2 andar',
  street: 'Rua das flores',
  district: 'centro',
  numberAddress: 20,
  created_at: new Date(),
  updated_at: new Date(),
  cep: '12345678',
  cityId: 4,
  user: {
    id: 2,
    name: 'user',
    email: 'test@test.com',
    userTypeId: 2,
  },
  city: {
    id: 4,
    stateId: 8,
    name: 'Recife',
    state: 'PE',
  },
};
