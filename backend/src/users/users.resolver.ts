import {Resolver, Query, Mutation, Args} from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-users.dto";
import { UserInput } from "./inputs/user.input";

@Resolver()
export class UsersResolver {
    constructor(
    private usersService: UsersService
    ){}

    @Query(() => String)
    async hello(){
        return "fuck you"
    }

    @Query(() => [CreateUserDto])
    async users(){
        return this.usersService.findAll();
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput){
        return this.usersService.create(input);
    }
}