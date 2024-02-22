import { Test } from '@nestjs/testing';
import { UserRepository } from '../../modules/user/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../modules/user/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../modules/user/user.service';
import { UserEntityMock } from './mock/user.mock';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CreatedUserMock } from './mock/create-user.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let userRepoTyOrm: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockImplementation((id: number) => {
              if (id === UserEntityMock.id) {
                return UserEntityMock;
              } else {
                return null; // ou return undefined;
              }
            }),
            findByEmail: jest.fn().mockImplementation((email: string) => {
              if (email === UserEntityMock.email) {
                return UserEntityMock;
              } else {
                return null; // ou return undefined;
              }
            }),
            findOneRelations: jest.fn().mockResolvedValue(UserEntityMock),
            create: jest.fn().mockResolvedValue(UserEntityMock),
            update: jest.fn().mockResolvedValue(UserEntityMock),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userRepoTyOrm = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(userService).toBeDefined();
  });

  it('should return a user by id', async () => {
    const user = await userService.getUserById(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });
  it('should return error when user not found by id', async () => {
    await expect(userService.getUserById(1)).rejects.toThrow(NotFoundException);
  });

  it('should return a user by email', async () => {
    const user = await userService.findUserByEmail(UserEntityMock.email);
    expect(user).toEqual(UserEntityMock);
  });
  it('should return error when user not found by email', async () => {
    await expect(userService.findUserByEmail('')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return a user by id relations', async () => {
    const user = await userService.getUserByIdRelation(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error if user exist', async () => {
    await expect(userService.register(CreatedUserMock)).rejects.toThrow(
      HttpException,
    );
  });
  it('should return error if user not exist', async () => {
    jest
      .spyOn(UserService.prototype, 'findUserByEmail')
      .mockResolvedValue(null);
    const user = await userService.register(CreatedUserMock);
    expect(user).toEqual(UserEntityMock);
  });

  it('should updated, if user not exist', async () => {
    await expect(userService.update(1, CreatedUserMock)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should updated, if user exist, but email is already exist', async () => {
    jest
      .spyOn(UserService.prototype, 'findUserByEmail')
      .mockResolvedValue(UserEntityMock as any);
    await expect(
      userService.update(UserEntityMock.id, UserEntityMock),
    ).rejects.toThrow(HttpException);
  });
  it('should updated, if user exist, but email is already not exist', async () => {
    jest
      .spyOn(UserService.prototype, 'findUserByEmail')
      .mockResolvedValue(null);
    const user = await userService.update(UserEntityMock.id, CreatedUserMock);
    expect(user).toEqual(UserEntityMock);
  });
});
