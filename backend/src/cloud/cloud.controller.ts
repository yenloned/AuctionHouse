import { fpsRange } from '@cloudinary/url-gen/actions/transcode';
import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { FilesInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import  * as FormData  from 'form-data';
import * as cloudinary from "cloudinary"
import { FormDataRequest } from 'nestjs-form-data';


@Controller('cloudinary')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {}

    @Get()
    homePage(): string{
        return this.cloudService.homePage();
    }

    //@Body() iconUpload
    @Post('uploadIcon')
    @UseGuards(JwtAuthGuard)
    //@FormDataRequest() //@Body() file2: FormDataTestDto, 
    //@UseInterceptors(FilesInterceptor('file'))
    async uploadIcon(/*@UploadedFile() file,*/ @Body() body){
        const timenow = new Date().getTime();

        //const id = iconUpload.get("public_id")
        //const preset = iconUpload.get("upload_preset")

        const public_id = body.id + "_icon"

        const signed = this.cloudService.cloudinary_sign(public_id, timenow, "auction-house-icons")

        return{data: {
                timestamp: timenow,
                signature: signed,
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET
            }
        }

        //return this.cloudService.cloudinaryUpload(iconUpload, signature);
    }
}
