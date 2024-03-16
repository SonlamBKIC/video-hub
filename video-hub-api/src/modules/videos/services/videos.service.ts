import { Injectable } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { FindVideoPaginationOutput, VideoEntity } from '../output';
// import getYoutubeId from 'get-youtube-id';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getYouTubeID = require('get-youtube-id');
import { VideosMongoRepository } from '../repositories/videos.repository';
import { FindVideoPaginationInput } from '../input';

@Injectable()
export class VideosService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly repository: VideosMongoRepository,
  ) {}

  async shareVideo(url: string): Promise<VideoEntity> {
    const youtubeId = getYouTubeID(url);
    const youtubeVideoData = await this.youtubeService.getVideoInfoById(youtubeId);

    const existedVideo = await this.repository.findOneByYoutubeId(youtubeId);

    let resultVideo: VideoEntity;
    if (!existedVideo) {
      resultVideo = await this.repository.create({
        youtubeId,
        url,
        title: youtubeVideoData.snippet.title,
        description: youtubeVideoData.snippet.description,
        shareCount: 1,
        statistics: {
          viewCount: parseInt(youtubeVideoData.statistics.viewCount, 10),
          likeCount: parseInt(youtubeVideoData.statistics.likeCount, 10),
          favoriteCount: parseInt(youtubeVideoData.statistics.favoriteCount, 10),
          commentCount: parseInt(youtubeVideoData.statistics.commentCount, 10),
        },
      });
    } else {
      resultVideo = await this.repository.update({
        youtubeId,
        shareCount: existedVideo.shareCount + 1,
      });
    }

    return resultVideo;
  }

  async getVideos(): Promise<VideoEntity[]> {
    return this.repository.findAll();
  }

  async getVideosPagination(payload: FindVideoPaginationInput): Promise<FindVideoPaginationOutput> {
    const { page, limit } = payload;
    const data = await this.repository.findPagination(page, limit);
    const total = await this.repository.count();
    return {
      data,
      total,
      page,
      limit,
    };
  }
}
