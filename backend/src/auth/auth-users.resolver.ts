import { UseGuards } from "@nestjs/common"
import {Resolver, Query, Mutation, Args, Int} from "@nestjs/graphql"
import { CreateUserDto } from "src/users/dto/create-users.dto"
import { AuthUsersService } from "./auth-users.service"
import { GqlAuthGuard } from "./guards/gql-auth.guard"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { LoginResponse } from "./outputs/login-response"

@Resolver()
export class AuthResolver {
    constructor(
    private authUsersService: AuthUsersService
    ){}

    @Query(() => String)
    async hello(){
        return "fuck you"
    }

    //Register
    @Mutation(() => CreateUserDto)
    async registerUser(@Args('input') checkInput: RegisterInput){
        const signupResult = await this.authUsersService.signup(checkInput)
        return signupResult;
    }

    //Login
    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async loginUser(@Args('input') loginInput: LoginInput){
        return this.authUsersService.login(loginInput);
    }
    
}