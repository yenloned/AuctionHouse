import { fpsRange } from '@cloudinary/url-gen/actions/transcode';
import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { FilesInterceptor } from "@nestjs/platform-express"
import { IconUpload } from './inputs/formdata.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cloudinary')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {}

    @Get()
    homePage(): string{
        return this.cloudService.homePage();
    }


    //https://stackoverflow.com/questions/61148959/fileinterceptor-and-body-issue-in-nestjs-upload-a-file-and-data-in-a-request

    //@Body() iconUpload
    @Post('uploadIcon')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('file'))
    uploadIcon(@UploadedFile() file): Observable<Object>{
        const timestamp = new Date().getTime();
        //TODO/Reminder: this approach works, however NESTJS is not able to use FormData <- fix this!!!!!!!
        /*if(body){
            console.log(file)
            console.log(body)
        }

        return body;*/
        console.log(file)
        return file

        //const id = iconUpload.get("public_id")
        //const preset = iconUpload.get("upload_preset")

        const signature = this.cloudService.cloudinary_sign("id", timestamp, "auction-house-icons")

        //return this.cloudService.cloudinaryUpload(iconUpload, signature);
    }
}
