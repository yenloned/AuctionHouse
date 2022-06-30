import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/users.schema';
import { RegisterInput } from './inputs/register.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthUsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>, 
        private usersService: UsersService
    ){}

    async checkRegisterInput(registerInput: any){
        //All Fail Cases
        const nameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/)
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

        if (!nameRegex.test(registerInput.firstname) || !nameRegex.test(registerInput.lastname)){
            return {errorMsg: "Your name should contain only English characters"}
        }
        if (!emailRegex.test(registerInput.email)){
            return {errorMsg: "Invalid Email Address"}
        }
        if (registerInput.password.length < 8){
            return {errorMsg: "User Password should have at least 8 characters"}
        }
        if (registerInput.password !== registerInput.confirm_password){
            return {errorMsg: "Password and Confirm Password does not match"}
        }
        if (this.userModel.findOne({"email": registerInput.email})){
            return {errorMsg: "Email Address already registered"}
        }
    }

    async signup(registerInput: RegisterInput, signupInput){
        const checkRegister = await this.checkRegisterInput(registerInput)
        if (checkRegister.errorMsg){
            console.log(checkRegister.errorMsg)
        }else{
            return this.usersService.create(signupInput)
        }
    }
}
