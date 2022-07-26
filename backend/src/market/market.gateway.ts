import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"
@WebSocketGateway(5001, {
    namespace: "market",
    cors:{
        origin: ["http://localhost:3000"]
    },
})
export class MarketGateway{

    @WebSocketServer()
    server: Server;

    @SubscribeMessage("message")
    handleMessage(@MessageBody() message: string): string {
        console.log(message)
        this.server.emit("message", message);
        return message;
    }
}