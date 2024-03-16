export interface VideoStatistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

export interface VideoEntity {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  description: string;
  shareCount: number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  statistics: VideoStatistics;
}