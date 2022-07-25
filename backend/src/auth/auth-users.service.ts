import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from 'src/users/inputs/user.input';
import { User, UserDocument } from 'src/users/users.schema';
import { RegisterInput } from './inputs/register.input';
import * as bcrypt from 'bcrypt';
import { salt } from './hashing/salt';
import { LoginInput } from './inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class AuthUsersService {
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>

    constructor(
        private jwtService: JwtService
    ){}

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
            postingItem: [],
            biddingItem: [],
            winningItem: [],
            iconURL: "https://res.cloudinary.com/auction-house/image/upload/v1657615446/icons/default_icon_x0v5ke.png"
        }
        this.create(signupInput)
        return errorMsgResult;
    }


    // Login
    async checkLoginInput(inputEmail: string, inputPassword: string){
        //Check if user existed and password correct
        const allUserInfo = await this.userModel.findOne({"email": inputEmail})

        if(!allUserInfo){
            throw new Error("Email Address does not existed. Make sure the input is correct.")
        }else if(!allUserInfo.password){
            throw new Error("Unkown Error encountered. Please try again later.")
        }

        const passwordMatched = await bcrypt.compare(inputPassword, allUserInfo.password);
        if (allUserInfo && passwordMatched){
            return allUserInfo;
        }
        throw new Error("Login Failed. Please check if the Email Address and Password is correct.")
    }

    async login(checkInput: LoginInput){
        const userInfo = await this.checkLoginInput(checkInput.email, checkInput.password)
        return {
            access_token: this.jwtService.sign({
                username: userInfo.email,
                sub: userInfo._id
            }),
            user: userInfo
        }
    }

    // Register Guest Account
    async createGuestAccount(){
        const hashedpassword = await bcrypt.hash(process.env.GUEST_PASSWORD, await salt())
        const fakeGmailForGuest = Math.random().toString(36).substring(2,10) + "@gmail.com"
        const signupInput = {
            firstname: "Guest",
            lastname: Math.random().toString(36).substring(2,10),
            email: fakeGmailForGuest,
            password: hashedpassword,
            balance: 1000000,
            postingItem: [],
            biddingItem: [],
            winningItem: [],
            iconURL: "https://res.cloudinary.com/auction-house/image/upload/v1657615446/icons/default_icon_x0v5ke.png"
        }
        try{
            this.create(signupInput);
            return {
                email: fakeGmailForGuest,
                password: process.env.GUEST_PASSWORD
            }
        }catch(e){
            return e;
        }
    }
}
