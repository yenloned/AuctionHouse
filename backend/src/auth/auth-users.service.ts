import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from 'src/users/inputs/user.input';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class AuthUsersService {
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>

    async create(createUserDto: UserInput): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

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
        const checkEmailResult = await this.userModel.findOne({"email": registerInput.email})
        if (checkEmailResult){
            return {errorMsg: "Email Address already registered"}
        }
        return {errorMsg: null};
    }

    async signup(checkInput){
        const checkRegister = await this.checkRegisterInput(checkInput)
        if (checkRegister.errorMsg){
            return ({errorMsg: checkRegister.errorMsg})
        }else{
            const signupInput = {
                firstname: checkInput.firstname,
                lastname: checkInput.lastname,
                email: checkInput.email,
                password: checkInput.password,
                balance: 1000000,
                currentItem: []
            }
            return this.create(signupInput)
        }
    }
}
