import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from 'src/users/inputs/user.input';
import { User, UserDocument } from 'src/users/users.schema';
import { RegisterInput } from './inputs/register.input';
import * as bcrypt from 'bcrypt';
import { salt } from './hashing/salt';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthUsersService {
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>

    //Register / SignUp

    async create(createUserDto: UserInput): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async checkRegisterInput(registerInput: RegisterInput){
        //All Fail Cases
        const nameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/)
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

        if (registerInput.firstname === "" || registerInput.lastname === "" || registerInput.email === ""){
            throw new Error("Invalid Input")
        }
        if (!nameRegex.test(registerInput.firstname) || !nameRegex.test(registerInput.lastname)){
            throw new Error("Your name should contain only English characters")
        }
        if (!emailRegex.test(registerInput.email)){
            throw new Error("Invalid Email Address")
        }
        if (registerInput.password.length < 8){
            throw new Error("User Password should have at least 8 characters")
        }
        if (registerInput.password !== registerInput.confirm_password){
            throw new Error ("Password and Confirm Password does not match")
        }
        const checkEmailResult = await this.userModel.findOne({"email": registerInput.email})
        if (checkEmailResult){
            throw new Error ("Email Address already registered")
        }
        return "User Registration check success"
    }

    async signup(checkInput: RegisterInput){
        const errorMsgResult = await this.checkRegisterInput(checkInput)
        const hashedpassword = await bcrypt.hash(checkInput.password, await salt())
        const signupInput = {
            firstname: checkInput.firstname,
            lastname: checkInput.lastname,
            email: checkInput.email,
            password: hashedpassword,
            balance: 1000000,
            currentItem: []
        }
        this.create(signupInput)
        return errorMsgResult;
    }


    // Login

    async checkLoginInput(inputEmail: string, inputPassword: string){
        const allUserInfo = await this.userModel.findOne({"email": inputEmail})
        const { password, ...userInfo } = allUserInfo

        //console.log(password)
        const passwordMatched = await bcrypt.compare(inputPassword, password);
        //console.log(passwordMatched)
        if (userInfo && passwordMatched){
            return userInfo;
        }
        return null;
    }

    async login(checkInput: LoginInput){
        const userInfo = await this.checkLoginInput(checkInput.email, checkInput.password)
        return {
            access_token: "jwt_token_hey",
            user: userInfo
        }

    }
}
