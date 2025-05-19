import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class DrawingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('draw')
  handleDraw(@MessageBody() data: any): void {
    this.server.emit('draw', data);
  }

  @SubscribeMessage('cursor')
  handleCursor(@MessageBody() data: any): void {
    this.server.emit('cursor', data);
  }
}
