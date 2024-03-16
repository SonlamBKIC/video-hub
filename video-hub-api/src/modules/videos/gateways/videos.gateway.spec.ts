import { Test, TestingModule } from '@nestjs/testing';
import { VideosGateway } from './videos.gateway';

describe('VideosGateway', () => {
  let gateway: VideosGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosGateway],
    }).compile();

    gateway = module.get<VideosGateway>(VideosGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
