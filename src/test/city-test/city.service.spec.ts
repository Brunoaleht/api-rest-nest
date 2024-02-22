import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { NotFoundException } from '@nestjs/common';

import { StateService } from '../../modules/state/state.service';
import { StateRepository } from '../../modules/state/repositories/state.repository';
import { StateEntity } from '../../modules/state/entity/state.entity';
import { CityMockEntity } from './mock/city.mock';
import { CitiesMockEntity } from './mock/cities.mock';
import { StateModule } from '../../modules/state/state.module';
import { CityService } from '../../modules/city/city.service';
import { CityRepository } from '../../modules/city/repositories/city.repository';
import { CityEntity } from '../../modules/city/entity/city.entity';
import { CacheService } from '../../modules/cache/cache.service';
import { CacheModule } from '../../modules/cache/cache.module';
import { StateTestingModule } from '../modules/state.test.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'; // Importe o Connection do TypeORM
import { AddressEntity } from '../../modules/address/entity/address.entity';
import { UserEntity } from '../../modules/user/entity/user.entity';

describe('CityService', () => {
  let cityService: CityService;
  let cityRepository: CityRepository;
  let cityRepoTyOrm: Repository<CityEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CityService,
        CacheService,
        {
          provide: getRepositoryToken(CityEntity),
          useClass: Repository,
        },
        {
          provide: CityRepository,
          useValue: {
            findOne: jest.fn().mockImplementation((id: number) => {
              if (id === CityMockEntity.id) {
                return CityMockEntity;
              } else {
                return null; // ou return undefined;
              }
            }),
            findCitiesByStateId: jest
              .fn()
              .mockImplementation((stateId: number) => {
                if (stateId === CityMockEntity.stateId) {
                  // Simular a busca das cidades com base no estado fornecido
                  return CitiesMockEntity.filter(
                    (city) => city.stateId === stateId,
                  );
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
              if (stateId === CityMockEntity.stateId) {
                return { id: 4, name: 'São Paulo', ibge: 35 }; // Mock do estado com ID 4
              } else {
                return null; // ou lançar uma exceção se o estado não for encontrado
              }
            }),
          },
        },
      ],
      imports: [
        CacheModule,
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

    cityService = moduleRef.get<CityService>(CityService);
    cityRepository = moduleRef.get<CityRepository>(CityRepository);
    cityRepoTyOrm = moduleRef.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', async () => {
    expect(cityService).toBeDefined();
  });

  it('should return a city by id', async () => {
    const city = await cityService.getCityId(CityMockEntity.id);
    expect(city).toEqual(CityMockEntity);
  });
  it('should return error when city not found by id', async () => {
    await expect(cityService.getCityId(3)).rejects.toThrow(NotFoundException);
  });

  it('should return all cities in unique state', async () => {
    const cities = await cityService.getAllCityByStateId(
      CityMockEntity.stateId,
    );
    expect(cities).toEqual(CitiesMockEntity);
  });

  it('should return error when not found all states', async () => {
    await expect(cityService.getAllCityByStateId(2)).rejects.toThrow(
      new NotFoundException('State not found'),
    );
  });
});
