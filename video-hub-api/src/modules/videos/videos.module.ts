import { Module } from '@nestjs/common';
import { VideosService, YoutubeService } from './services';
import { VideosController } from './controllers';
import { VideosMongoRepository } from './repositories';
import { VideosGateway } from './gateways';

@Module({
  providers: [VideosService, YoutubeService, VideosMongoRepository, VideosGateway],
  controllers: [VideosController],
})
export class VideosModule {}
