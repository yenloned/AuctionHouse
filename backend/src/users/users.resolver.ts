import {Resolver, Query, Mutation, Args, Int} from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-users.dto";
import { UserInput } from "./inputs/user.input";
import { FindUserInput } from "./inputs/find-user.input";

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

    @Query(() => CreateUserDto)
    async find_user(@Args('id') id: FindUserInput){
        return this.usersService.findOne(id);
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput){
        return this.usersService.create(input);
    }
}