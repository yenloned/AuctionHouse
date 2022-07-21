import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { IconUpload } from './inputs/formdata.interface';
import * as cloudinary from "cloudinary"
import { User, UserDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CloudService {

  @InjectModel(User.name)
  private userModel: Model<UserDocument>

  homePage(): string {
      return `Backend API site for Cloudinary ${process.env.CLOUDINARY_NAME}`;
  }

  cloudinary_sign(public_id: string, timestamp: number, upload_preset: string){
    let shasum = createHash('sha1')
    const plaintext = `public_id=${public_id}&timestamp=${timestamp}&upload_preset=${upload_preset}${process.env.CLOUDINARY_SECRET}`
    const signature = shasum.update(plaintext).digest('hex')
    
    return signature
  }

  async update_iconURL(userId: string, newIconURL: string){
    await this.userModel.updateOne({_id: userId}, {$set: {iconURL: newIconURL}}, {upsert: false})
  }


  async cloudinaryUpload(fileInput: IconUpload, signature: string, timestamp: number) {
      try{
        const uploadResult = await cloudinary.v2.uploader.upload(fileInput.data, {
          upload_preset: fileInput.upload_preset,
          public_id: fileInput.public_id,
          timestamp: timestamp,
          signature: signature,
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });
          if (uploadResult.secure_url){
            this.update_iconURL(fileInput.public_id, uploadResult.secure_url);
            return uploadResult
          }else{
            return "We have encountered error. Please try again later."
          }
        }catch(e){
          return "Invalid Upload. Please try again"
      }
  }
}
