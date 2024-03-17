import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { config } from '../../../config';

@WebSocketGateway(config.socketPort, { cors: true })
export class VideosGateway {
  @WebSocketServer() public server: any;

  @SubscribeMessage('join')
  handleMessage(client: any, payload: any): string {
    console.log('join', payload);
    return 'Hello world!';
  }
}
