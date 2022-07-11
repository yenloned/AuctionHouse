import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-users.dto";
import { UserInput } from "./inputs/user.input";
import { JwtDecodeDto } from "./dto/jwt-decode.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => CreateUserDto)
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
    async find_user(@Args('id') id: string){
        return this.usersService.findOne(id);
    }

    @Query(() => CreateUserDto)
    @UseGuards(JwtAuthGuard)
    async find_profile(@Args('input') jwt_token: string){
        const userId = await this.usersService.findProfile(jwt_token);
        return this.usersService.findOne(userId);
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput){
        return this.usersService.create(input);
    }
}