import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthUsersService } from "../auth-users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authUsersService: AuthUsersService){
        super(/*config object*/)

    }

    async validate(email: string, password: string): Promise<any> {
        const allUserInfo = await this.authUsersService.checkLoginInput(email, password)
        //console.log(allUserInfo)
        if (!allUserInfo){
            throw new UnauthorizedException();
        }
        return allUserInfo
    }
}