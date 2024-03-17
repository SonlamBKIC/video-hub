import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosGateway } from '../gateways';
import { VideosService, YoutubeService } from '../services';
import { VideosMongoRepository } from '../repositories';
import { youtubeMockService } from '../services/youtube-mock.service';
import { videosMockGateway } from '../gateways/videos-mock.gateway';
import { videosMockRepository } from '../repositories/videos-mock.repository';

describe('VideosController', () => {
  let controller: VideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        VideosService,
        {
          provide: VideosGateway,
          useValue: videosMockGateway,
        },
        {
          provide: VideosMongoRepository,
          useValue: videosMockRepository,
        },
        {
          provide: YoutubeService,
          useValue: youtubeMockService,
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('share a new video', async () => {
    const video = await controller.shareVideo(
      {
        authUser: { username: 'user-1' },
      },
      {
        url: 'https://www.youtube.com/watch?v=youtubeId-9',
      },
    );
    expect(video).toEqual({
      title: 'Video 9',
      description: 'Description 9',
      youtubeId: 'youtubeId-9',
      url: 'https://www.youtube.com/watch?v=youtubeId-9',
      shareCount: 1,
      statistics: {
        viewCount: 900,
        likeCount: 90,
        favoriteCount: 45,
        commentCount: 27,
      },
    });
  });

  it('query videos', async () => {
    const videos = await controller.getVideos({
      page: '1',
      limit: '2',
    });
    expect(videos).toEqual({
      data: [
        {
          id: '1',
          title: 'Video 1',
          description: 'Description 1',
          youtubeId: 'youtubeId-1',
          url: 'https://www.youtube.com/watch?v=youtubeId-1',
          shareCount: 1,
          createdBy: 'user-1',
          statistics: {
            viewCount: 100,
            likeCount: 10,
            favoriteCount: 5,
            commentCount: 3,
          },
        },
        {
          id: '2',
          title: 'Video 2',
          description: 'Description 2',
          youtubeId: 'youtubeId-2',
          url: 'https://www.youtube.com/watch?v=youtubeId-2',
          shareCount: 10,
          createdBy: 'user-2',
          statistics: {
            viewCount: 200,
            likeCount: 20,
            favoriteCount: 10,
            commentCount: 6,
          },
        },
      ],
      total: 6,
      page: 1,
      limit: 2,
    });
  });
});
