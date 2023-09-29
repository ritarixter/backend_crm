import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: true })
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Обработка подключения клиента
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // Обработка отключения клиента
    console.info(`socket Disconnected ${client}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    // Обработайте сообщение от клиента
    this.server.emit('message', payload); // Отправьте сообщение всем клиентам
    return 'Сообщение успешно обработано';
  }

  sendMessageToClient(clientId: string, message: string) {
    this.server.to(clientId).emit('eventName', message);
  }
}
