import { VideoEntity } from '../output';

export interface ShareVideoInput {
  url: string;
}

export type CreateVideoInput = Omit<VideoEntity, 'id'>;

export type QueryVideoInput = { limit: string; page: string };

export type FindVideoPaginationInput = {
  limit: number;
  page: number;
};
