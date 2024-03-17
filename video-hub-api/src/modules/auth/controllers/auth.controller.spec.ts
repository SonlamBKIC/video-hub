import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services';
import { UsersRepository } from '@modules/users/repositories';
import { UsersService } from '@modules/users/services';
import { JwtService } from '@nestjs/jwt';
import { usersMockRepository } from '@modules/users/repositories/users-mock.repository';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersMockRepository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(async () => 'token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
