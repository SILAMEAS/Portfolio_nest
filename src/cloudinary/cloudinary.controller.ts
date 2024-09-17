import {Controller, Delete, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {CloudinaryService} from "./cloudinary.service";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {ResponseCloudinary} from './dto/cloudinary-response';

@ApiTags('upload with cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {
  }
  @Post("/upload")
  @UseInterceptors(FileInterceptor('image') as any)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() image: Express.Multer.File):Promise<ResponseCloudinary> {
    return await this.cloudinaryService.uploadImage(image)
  }
  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    return this.cloudinaryService.deleteImage(publicId);
  }
}
