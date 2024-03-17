import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '@modules/users/repositories';
import { JwtService } from '@nestjs/jwt';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { usersMockRepository } from '@modules/users/repositories/users-mock.repository';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login success', async () => {
    const result = await service.login({ username: 'user-1', password: 'psbt@123456' });
    expect(result).toEqual({ access_token: 'token' });
  });

  it('login with incorrect password', async () => {
    try {
      await service.login({ username: 'user-1', password: 'psbt@12345678' });
    } catch (err) {
      expect(err).toEqual(new UnauthorizedException());
    }
  });

  it('login with incorrect username', async () => {
    try {
      await service.login({ username: 'user-3', password: 'psbt@123456' });
    } catch (err) {
      expect(err).toEqual(new HttpException('User not found', 404));
    }
  });
});
