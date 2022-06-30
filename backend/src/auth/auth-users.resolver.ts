import {Resolver, Query, Mutation, Args, Int} from "@nestjs/graphql"
import { CreateUserDto } from "src/users/dto/create-users.dto"
import { UserInput } from "src/users/inputs/user.input"
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
        console.log("OK")
        const signupInput = {
            firstname: checkInput.firstname,
            lastname: checkInput.lastname,
            email: checkInput.email,
            password: checkInput.password,
            balance: 1000000,
            currentItem: []
        }
        return this.authUsersService.signup(checkInput, signupInput)
    }

    

    /*
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
    */

    
}