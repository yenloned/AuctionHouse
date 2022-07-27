import { Injectable } from "@nestjs/common";
import { CreateMessageInput } from "./interfaces/createMessageDto";


@Injectable()
export class MarketService {

    print(createMessageDto: CreateMessageInput){
        console.log(createMessageDto.message)
    }
}