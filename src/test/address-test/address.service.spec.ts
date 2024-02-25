import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { NotFoundException } from '@nestjs/common';

import { StateService } from '../../modules/state/state.service';

import { StateEntity } from '../../modules/state/entity/state.entity';

import { CityService } from '../../modules/city/city.service';

import { CityEntity } from '../../modules/city/entity/city.entity';
import { CacheService } from '../../modules/cache/cache.service';
import { CacheModule } from '../../modules/cache/cache.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'; // Importe o Connection do TypeORM
import { AddressEntity } from '../../modules/address/entity/address.entity';
import { UserEntity } from '../../modules/user/entity/user.entity';
import { CityTestingModule } from '../modules/city.test.module';
import { AddressService } from '../../modules/address/address.service';
import { AddressRepository } from '../../modules/address/repositories/address.repository';
import { AddressMockEntity } from './mock/address.mock';
import { UserService } from '../../modules/user/user.service';
import { AddressesMock } from './mock/addresses.mock';
import { UserTestingModule } from '../modules/user.test.module';
import { StateTestingModule } from '../modules/state.test.module';

describe('AddressService', () => {
  let addressService: AddressService;
  let addressRepository: AddressRepository;
  let addressRepoTyOrm: Repository<AddressEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AddressService,
        CacheService,
        {
          provide: getRepositoryToken(AddressEntity),
          useClass: Repository,
        },
        {
          provide: AddressRepository,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((address: AddressEntity, userId: number) => {
                if (userId === AddressMockEntity.userId) {
                  return AddressMockEntity;
                } else {
                  return null; // ou return undefined;
                }
              }),
            findAddressByUserId: jest
              .fn()
              .mockImplementation((userId: number) => {
                if (userId === AddressMockEntity.userId) {
                  return AddressesMock;
                } else {
                  return null; // ou return undefined;
                }
              }),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            // Implemente os métodos necessários do CACHE_MANAGER aqui
            // Por exemplo:
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: DataSource, // Substitua 'DataSource' pelo nome real do seu DataSource, se for diferente
          useValue: {
            // Implemente os métodos necessários do DataSource aqui
            // Por exemplo:
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }, // Aqui você pode fornecer um objeto vazio ou um mock do seu DataSource
        },
        {
          provide: StateService,
          useValue: {
            findOneState: jest.fn().mockImplementation((stateId: number) => {
              if (stateId === AddressMockEntity.city.stateId) {
                return { id: 8, name: 'Recife', ibge: 35 }; // Mock do estado com ID 4
              } else {
                return null; // ou lançar uma exceção se o estado não for encontrado
              }
            }),
          },
        },
        {
          provide: CityService,
          useValue: {
            getCityId: jest.fn().mockImplementation((cityId: number) => {
              if (cityId === AddressMockEntity.cityId) {
                return { id: 4, name: 'São Paulo', ibge: 35 }; // Mock do estado com ID 4
              } else {
                return null; // ou lançar uma exceção se o estado não for encontrado
              }
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockImplementation((id: number) => {
              if (id === AddressMockEntity.userId) {
                return AddressMockEntity;
              } else {
                return null; // ou return undefined;
              }
            }),
          },
        },
      ],
      imports: [
        CacheModule,
        CityTestingModule,
        UserTestingModule,
        StateTestingModule,
        TypeOrmModule.forRoot({
          type: 'sqlite', // Define o tipo de banco de dados para SQLite
          database: ':memory:', // Usa um banco de dados em memória
          entities: [CityEntity, AddressEntity, StateEntity, UserEntity], // Lista de entidades a serem carregadas pelo TypeOrmModule
          synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (apenas para testes)
          logging: false, // Desativa o logging do TypeOrmModule para evitar poluir a saída dos testes
        }),
      ],
    }).compile();

    addressService = moduleRef.get<AddressService>(AddressService);
    addressRepository = moduleRef.get<AddressRepository>(AddressRepository);
    addressRepoTyOrm = moduleRef.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', async () => {
    expect(addressService).toBeDefined();
  });

  it('should return register address', async () => {
    const address = await addressService.createAddress(
      AddressMockEntity,
      AddressMockEntity.userId,
    );
    expect(address).toEqual(AddressMockEntity);
  });
  // it('should return error when userId not found', async () => {
  //   await expect(
  //     addressService.createAddress(AddressMockEntity, 1),
  //   ).rejects.toThrow(new NotFoundException(`User, userId: ${1} not found`));
  // });

  // it('should return error when cityId not found', async () => {
  //   await expect(
  //     addressService.createAddress({ ...AddressMockEntity, cityId: 8 }, 1),
  //   ).rejects.toThrow(new NotFoundException(`CityId ${8} not found`));
  // });

  it('should return all address in unique userId', async () => {
    const addresses = await addressService.getAddressByUserId(
      AddressMockEntity.userId,
    );
    expect(addresses).toEqual(AddressesMock);
  });

  // it('should return all address in unique userId, if user not exist', async () => {
  //   await expect(addressService.getAddressByUserId(1)).rejects.toThrow(
  //     new NotFoundException(`User, userId: ${1} not found`),
  //   );
  // });
});
