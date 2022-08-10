import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { CreateMessageInput, JoinRoomInput } from "./interfaces/createMessageDto";
import { MarketService } from "./market.service";
@WebSocketGateway(6001, {
    transports: ['websocket'],
    cors:{
        origin: ["http://localhost:3000"]
    },
})
export class MarketGateway{

    constructor(private readonly marketService: MarketService){}

    @WebSocketServer()
    server: Server;
    afterInit(server: any){
        Logger.log("Websocket Initialized")
    }

    @SubscribeMessage('send-message')
    async handleMessage(@MessageBody() createMessageInput: CreateMessageInput) {
        this.marketService.print(createMessageInput)
        this.server.emit('message', createMessageInput?.message);
    }

    @SubscribeMessage('join-room')
    async joinRoom(client: Socket, roomID: string){
        client.join(roomID)
        //this.server.to(roomID).emit('joined-room', `User have joined ${roomID}`)
        Logger.log(`User has joined Room ${roomID}`)
    }
}