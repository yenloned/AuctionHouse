import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CloudService } from './cloud.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('cloudinary')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {}

    @Get()
    homePage(): string{
        return this.cloudService.homePage();
    }

    @Post('uploadIcon')
    @UseGuards(JwtAuthGuard)
    async uploadIcon(@Body() body){
        const timenow = new Date().getTime();

        try{
            JSON.parse(JSON.stringify(body))
        }catch(e){
            return "File Upload Failed. Please check if the file format is correct."
        }
        const fileInput = body

        const signed = this.cloudService.cloudinary_sign(fileInput.public_id, timenow, fileInput.upload_preset)

        return this.cloudService.cloudinaryUpload(fileInput, signed, timenow);
    }
}
