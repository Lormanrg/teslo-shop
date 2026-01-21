import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [JwtModule],
})
export class MessagesWsModule {}
