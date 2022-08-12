import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { BidItemDto } from "src/items/dto/bid-dto";
import { BidItemInput } from "src/items/inputs/bid-item.input";
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

    @SubscribeMessage('bid_item')
    async bid_item(bid_input: BidItemInput, bid_result: BidItemDto){
        const topBidder = {
            email: bid_result.user_result.email,
            firstname: bid_result.user_result.firstname,
            lastname: bid_result.user_result.lastname,
            _id: bid_result.user_result._id,
            iconURL: bid_result.user_result.iconURL,
            bidder_time: bid_input.timestamp
        }
        const bidderActivity = {
            action: "bidded",
            bid_price: bid_input.bid_price,
            timestamp: bid_input.timestamp,
            user_data: {
                firstname: bid_result.user_result.firstname,
                lastname: bid_result.user_result.lastname
            }
        }
        this.server.to(bid_input.item_id).emit("bid_update", )
    }
}