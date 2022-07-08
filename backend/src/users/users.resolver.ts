import {Resolver, Query, Mutation, Args, Int} from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-users.dto";
import { UserInput } from "./inputs/user.input";
import { FindUserInput } from "./inputs/find-user.input";
import { JwtDecodeDto } from "./dto/jwt-decode.dto";

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

    @Query(() => JwtDecodeDto)
    async find_profile(@Args('input') jwt_token: string){
        return this.usersService.findProfile(jwt_token);
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput){
        return this.usersService.create(input);
    }
}