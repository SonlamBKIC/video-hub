import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from '@modules/auth/services';
import { UsersService } from '@modules/users/services';
import { VideosService, YoutubeService } from '@modules/videos/services';
import { UsersRepository } from '@modules/users/repositories';
import { VideosMongoRepository } from '@modules/videos/repositories';
import { JwtService } from '@nestjs/jwt';
import { youtubeMockService } from '@modules/videos/services/youtube-mock.service';
import { VideosGateway } from '@modules/videos/gateways';
import { usersMockRepository } from '@modules/users/repositories/users-mock.repository';
import { videosMockGateway } from '@modules/videos/gateways/videos-mock.gateway';
import { videosMockRepository } from '@modules/videos/repositories/videos-mock.repository';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        UsersService,
        VideosService,
        {
          provide: UsersRepository,
          useValue: usersMockRepository,
        },
        {
          provide: VideosMongoRepository,
          useValue: videosMockRepository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(async () => 'token'),
          },
        },
        {
          provide: YoutubeService,
          useValue: youtubeMockService,
        },
        {
          provide: VideosGateway,
          useValue: videosMockGateway,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
