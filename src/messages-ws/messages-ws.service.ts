import { Injectable } from '@nestjs/common';
import { ConnectedClients } from './interfaces/connected_client';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesWsService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    private connectedClients: ConnectedClients = {}

  async  registerClient(client:Socket, userId: string){


        const user = await this.userRepository.findOne({
            where:{
            id: userId
            }
        })
        if(!user) throw new Error('User not found')
        if(!user.isActive) throw new Error('User is not active')

        await this.getUserById(user)
        
        this.connectedClients[client.id] = {
            socket:client,
            user: user
        }
    }

    removeClient(clientId:string){
        delete this.connectedClients[clientId] 
    }


    getConnectedClients():string[]{
        return Object.keys(this.connectedClients)
    }

    getUserFullName(socketId:string){
        return this.connectedClients[socketId]?.user?.fullName
    }

    private async getUserById(user: User){
       
        for(const clientId of Object.keys(this.connectedClients)){
            const client = this.connectedClients[clientId]
            if(client?.user?.id === user.id) {
                  client.socket.disconnect()
                  break
            }

        }
        
    }
}
