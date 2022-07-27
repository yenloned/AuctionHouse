import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"
import { CreateMessageInput } from "./interfaces/createMessageDto";
import { MarketService } from "./market.service";
@WebSocketGateway(5001, {
    transports: ['websocket'],
    cors:{
        origin: ["http://localhost:3000"]
    },
})
export class MarketGateway{
    constructor(private readonly marketService: MarketService){}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send-message')
    async handleMessage(@MessageBody() createMessageInput: CreateMessageInput) {
        this.marketService.print(createMessageInput)
        this.server.emit('message', createMessageInput?.message);
        return createMessageInput?.message;
    }
}