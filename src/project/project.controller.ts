import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
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
        title:{
          type:'string',
          example:"title of project"
        },
        description:{
          type:'string',
          example:"description of project"
        },
        link:{
          type:'string',
          example:"link of project"
        }
      },
    },
  })
  async create(@UploadedFile() image: Express.Multer.File,@Body() body) {
    console.log(image)
    if(image&&body)
      return await this.projectService.create(image,body);
    else throw new BadRequestException("Image is required")
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
   async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(+id);
  }
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
        title:{
          type:'string',
          example:"title of project"
        },
        description:{
          type:'string',
          example:"description of project"
        },
        link:{
          type:'string',
          example:"link of project"
        }
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string,@UploadedFile() image: Express.Multer.File,@Body() body:any) {
    return await this.projectService.update(+id, body,image);
  }
  /** all project all image_project all image in server on cloudinary */
  @Delete("/all")
  removeAll() {
    return this.projectService.removeAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
