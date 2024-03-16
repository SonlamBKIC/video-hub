import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { config } from 'src/config';

@Injectable()
export class YoutubeService {
  private youtubeClient = google.youtube({
    version: 'v3',
    auth: config.googleApiKey,
  });

  constructor() {}

  async getVideoInfoById(id: string) {
    const videoInfo = await this.youtubeClient.videos.list({
      part: ['snippet,contentDetails,statistics'],
      id: [id],
    });

    return videoInfo.data.items[0];
  }
}
