import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { NotFoundException } from '@nestjs/common';

import { StateService } from '../../modules/state/state.service';
import { StateRepository } from '../../modules/state/repositories/state.repository';
import { StateEntity } from '../../modules/state/entity/state.entity';
import { StateMockEntity } from './mock/state.mock';
import { StatesMockEntity } from './mock/states.mock';

describe('StateService', () => {
  let stateService: StateService;
  let stateRepository: StateRepository;
  let stateRepoTyOrm: Repository<StateEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useClass: Repository,
        },
        {
          provide: StateRepository,
          useValue: {
            findOne: jest.fn().mockImplementation((id: number) => {
              if (id === StateMockEntity.id) {
                return StateMockEntity;
              } else {
                return null; // ou return undefined;
              }
            }),
            findAll: jest.fn().mockImplementation(() => {
              return StatesMockEntity;
            }),
          },
        },
      ],
    }).compile();

    stateService = moduleRef.get<StateService>(StateService);
    stateRepository = moduleRef.get<StateRepository>(StateRepository);
    stateRepoTyOrm = moduleRef.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', async () => {
    expect(stateService).toBeDefined();
  });

  it('should return a state by id', async () => {
    const state = await stateService.findOneState(StateMockEntity.id);
    expect(state).toEqual(StateMockEntity);
  });
  it('should return error when state not found by id', async () => {
    await expect(stateService.findOneState(3)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return all states', async () => {
    const states = await stateService.getAllState();
    expect(states).toEqual(StatesMockEntity);
  });

  // it('should return error when not found all states', async () => {
  //   await expect(stateService.getAllState()).rejects.toThrow(NotFoundException);
  // });
});
