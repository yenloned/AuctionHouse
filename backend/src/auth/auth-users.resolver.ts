import {Resolver, Query, Mutation, Args, Int} from "@nestjs/graphql"
import { CreateUserDto } from "src/users/dto/create-users.dto"
import { AuthUsersService } from "./auth-users.service"
import { RegisterInput } from "./inputs/register.input"

@Resolver()
export class AuthResolver {
    constructor(
    private authUsersService: AuthUsersService
    ){}

    @Query(() => String)
    async hello(){
        return "fuck you"
    }

    @Mutation(() => CreateUserDto)
    async registerUser(@Args('input') checkInput: RegisterInput){
        const signupResult = await this.authUsersService.signup(checkInput)
        console.log(signupResult)
        return signupResult;
    }

    
}