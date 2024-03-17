import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repositories';
import { usersMockRepository } from '../repositories/users-mock.repository';

const mockUserInput = {
  username: 'user-1',
  password: 'pass-1',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersMockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const createdUser = await service.createUser(mockUserInput);
    expect(createdUser).toEqual({ ...mockUserInput, password: createdUser.password });
  });
});
