import * as cloudinary from 'cloudinary';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: "Cloudinary",
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.KEY,
      api_secret: process.env.SECRET,
    });
  },
};