import { bootstrapMongo } from '@infrastructures/mongoose';
import * as usersData from './users-data.json';
import * as videosData from './videos-data.json';
import { config } from '../../config';
import { VideosMongoRepository } from '@modules/videos/repositories';
import { UsersRepository } from '@modules/users/repositories';

export const initData = async () => {
  try {
    await bootstrapMongo(config);
  } catch (error) {
    console.error('Error connecting to mongo:', error);
    process.exit(1);
  }

  const userRepo = new UsersRepository();
  const repo = new VideosMongoRepository();

  for (const user of usersData) {
    try {
      const createdUser = await userRepo.create(user);
      console.log('Created user:', createdUser.username);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  for (const video of videosData) {
    try {
      const createdVideo = await repo.create(video);
      console.log('Created video:', createdVideo.youtubeId);
    } catch (error) {
      console.error('Error creating video:', error);
    }
  }

  process.exit(0);
};

initData();
