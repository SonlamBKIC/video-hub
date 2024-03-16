import mongoose from 'mongoose';
import { MongooseModelFactory } from '@infrastructures/mongoose';
import { VideoEntity } from '../output';

const VideoStatisticsSchema = new mongoose.Schema(
  {
    viewCount: Number,
    likeCount: Number,
    favoriteCount: Number,
    commentCount: Number,
  },
  {
    _id: false,
  },
);

const videoSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  description: String,
  shareCount: Number,
  createdAt: Date,
  lastModifiedAt: Date,
  statistics: VideoStatisticsSchema,
});

videoSchema
  .index({ youtubeId: 1 }, { unique: true })
  .index({ url: 1 }, { unique: true })
  .index({ createdAt: 1 })
  .index({ lastModifiedAt: 1 })
  .index({
    title: 'text',
    description: 'text',
  });

videoSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.lastModifiedAt = now;
  next();
});

videoSchema
  .virtual('id')
  .get(function () {
    return this._id;
  })
  .set(function (id: string) {
    this.set({ _id: id });
  });

export const VideoMongoModel = MongooseModelFactory.compile<VideoEntity>({
  name: 'videos',
  schema: videoSchema,
});
