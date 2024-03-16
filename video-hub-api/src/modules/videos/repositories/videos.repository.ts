import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from '../input';
import { VideoMongoModel } from '../models';
import { VideoEntity } from '../output';

@Injectable()
export class VideosMongoRepository {
  private model = VideoMongoModel;

  constructor() {}

  public async create(payload: CreateVideoInput): Promise<VideoEntity> {
    const createdVideo = (await this.model.create(payload)).toJSON({ virtuals: true });
    return createdVideo;
  }

  public async update(payload: Partial<VideoEntity>): Promise<VideoEntity> {
    const updatedVideo = (
      await this.model.findOneAndUpdate(
        {
          youtubeId: payload.youtubeId,
        },
        payload,
        { new: true },
      )
    )?.toJSON({ virtuals: true });
    return updatedVideo;
  }

  public async findOneByYoutubeId(youtubeId: string): Promise<VideoEntity | undefined> {
    const video = await this.model.findOne({
      youtubeId,
    });
    return video ? video.toJSON({ virtuals: true }) : undefined;
  }

  public async findAll(): Promise<VideoEntity[]> {
    const videos = await this.model.find().sort({ lastModifiedAt: -1 });
    return videos.map((video) => video.toJSON({ virtuals: true }));
  }

  public async findPagination(page: number, limit: number, filter?: any): Promise<VideoEntity[]> {
    const videos = await this.model
      .find(filter || {})
      .sort({ lastModifiedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return videos.map((video) => video.toJSON({ virtuals: true }));
  }

  public async count(filter?: any): Promise<number> {
    return this.model.countDocuments(filter || {});
  }
}
