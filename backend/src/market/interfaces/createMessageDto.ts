import { InputType, Field } from "@nestjs/graphql";
import { Socket } from "socket.io";

@InputType()
export class CreateMessageInput {
    @Field()
    message: string;
}

@InputType()
export class JoinRoomInput{
    @Field()
    id: string;

    @Field()
    socket: Socket
}