import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { IconUpload } from './inputs/formdata.interface';

@Injectable()
export class CloudService {
    homePage(): string {
        return `Backend API site for Cloudinary ${process.env.CLOUDINARY_NAME}`;
    }

    cloudinary_sign(public_id: string, timestamp: number, upload_preset: string){
      let shasum = createHash('sha1')
      const plaintext = `public_id=${public_id}&timestamp=${timestamp}&upload_preset=${upload_preset}${process.env.CLOUDINARY_SECRET}`
      const signature = shasum.update(plaintext).digest('hex')
      
      return signature
    }


    async cloudinaryUpload(formData: any, signature: string) {

        formData.append("cloud_name", process.env.CLOUDINARY_NAME);
        formData.append("api_key", process.env.CLOUDINARY_KEY);
        formData.append("api_secret", process.env.CLOUDINARY_SECRET);
        formData.append("signature", signature);

        try{
        const imgData = await fetch(`https://api.cloudinary.com/v1_1/auction-house/image/upload`, {
            method: 'POST',
            body: formData,
          }).then(r => r.json());
          if (imgData.secure_url){
            return imgData.secure_url
          }else{
            return "Upload Failed. Please try again later."
          }
        }catch(e){
            return "Error occured while uploading, please try again"
        }
    }
}
