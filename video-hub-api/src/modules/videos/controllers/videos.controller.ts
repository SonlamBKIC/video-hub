import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { VideosService } from '../services';
import { QueryVideoInput, ShareVideoInput } from '../input';
import { Public } from '@modules/auth/decorators';
import { FindVideoPaginationOutput } from '../output';
import { VideosGateway } from '../gateways';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly videosGateWay: VideosGateway,
  ) {}

  @Public()
  @Get()
  async getVideos(@Query() query: QueryVideoInput): Promise<FindVideoPaginationOutput> {
    return this.videosService.getVideosPagination({
      page: parseInt(query.page),
      limit: parseInt(query.limit),
    });
  }

  @Post()
  async shareVideo(@Req() req: any, @Body() payload: ShareVideoInput): Promise<any> {
    const sharedVideo = await this.videosService.shareVideo(payload.url);
    this.videosGateWay.server.emit('videos', {
      video: sharedVideo,
      user: req.authUser,
    });
    return sharedVideo;
  }
}
