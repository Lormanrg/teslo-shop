import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new_message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/dto/jwt_payload.dto';

@WebSocketGateway({cors: true})
export class MessagesWsGateway {
  constructor(private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {

     }

     @WebSocketServer()
     server: Server

 async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string
    let payload: JwtPayload
    try {
      //console.log('token',token)
    
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload?.id)
    } catch (error) {
      console.log('Token no valido', error)
      client.disconnect()
      return
    }

    //console.log({payload})


      this.server.emit('client_updated',
       this.messagesWsService.getConnectedClients()
      )

  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.server.emit('client_updated',
      this.messagesWsService.getConnectedClients()
     )
  }

  //menssage from client to server
  @SubscribeMessage('message_from_client')
  async handleMessage(client: Socket, message: NewMessageDto){
   
    //Send message only to the client that sent the message
    // client.emit('message_from_server',{
    //   fullName: 'Soy Yo!',
    //   message: message.message || 'no message'
    // })

    //Send message to all clients except the one that sent the message
    // client.broadcast.emit('message_from_server',{
    //   fullName: 'Soy Yo!',
    //   message: message.message || 'no message'
    // })

    //Send message to all clients
    this.server.emit('message_from_server',{
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: message.message || 'no message'
    })
  }

  

}
