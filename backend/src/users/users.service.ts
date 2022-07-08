import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { UserInput } from './inputs/user.input';
import { FindUserInput } from './inputs/find-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  @InjectModel(User.name)
  private userModel: Model<UserDocument>

  constructor(
    private jwtService: JwtService) {}

  async create(createUserDto: UserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userid: FindUserInput): Promise<User> {
    return this.userModel.findOne({"_id": userid});
  }

  //TODO: perform nested field to fetch user data by decoded JWT
  async findProfile(jwt_token: string){
    const decodedJWT = this.jwtService.decode(jwt_token);
    return decodedJWT;
  }
}
