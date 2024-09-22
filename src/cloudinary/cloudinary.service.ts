import {Injectable} from '@nestjs/common';
import {v2} from "cloudinary";
import * as streamifier from 'streamifier';
import {ResponseCloudinary} from './dto/cloudinary-response';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<ResponseCloudinary> {
    const uploadRes:ResponseCloudinary|null =await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
         resolve(result);
      });
      streamifier.createReadStream(file.buffer).pipe(upload);

    });
    if(uploadRes){
      return uploadRes;
    }else
    return null
  }
  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
  // Optional: If you want to delete multiple images at once
  async deleteMultipleImages(publicIds: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      v2.api.delete_resources(publicIds, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
