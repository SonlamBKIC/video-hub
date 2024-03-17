import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { VideosMongoRepository } from '../repositories';
import { videosMockRepository } from '../repositories/videos-mock.repository';
import { YoutubeService } from './youtube.service';
import { youtubeMockService } from './youtube-mock.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
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

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('share a new video', async () => {
    const video = await service.shareVideo('https://www.youtube.com/watch?v=youtubeId-9');
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

  it('share an old video should increase share count by one', async () => {
    const video = await service.shareVideo('https://www.youtube.com/watch?v=youtubeId-1');
    expect(video).toEqual({
      id: '1',
      title: 'Video 1',
      description: 'Description 1',
      youtubeId: 'youtubeId-1',
      url: 'https://www.youtube.com/watch?v=youtubeId-1',
      shareCount: 2,
      createdBy: 'user-1',
      statistics: {
        viewCount: 100,
        likeCount: 10,
        favoriteCount: 5,
        commentCount: 3,
      },
    });
  });

  it('find videos with pagination', async () => {
    const page = 1;
    const limit = 2;
    const videos = await service.getVideosPagination({ page, limit });
    expect(videos).toEqual({
      data: [
        {
          id: '1',
          title: 'Video 1',
          description: 'Description 1',
          youtubeId: 'youtubeId-1',
          url: 'https://www.youtube.com/watch?v=youtubeId-1',
          shareCount: 2,
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
      page,
      limit,
    });
  });
});
