import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
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
  async create(@UploadedFile() image: Express.Multer.File,@Body() createProjectDto: CreateProjectDto) {
    try {
      return await this.projectService.create(image,createProjectDto);
    }catch (e){
      throw new Error(e);
    }
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
  // @Delete('/image/:publicId')
  // async deleteImage(@Param('publicId') publicId: string) {
  //   return this.cloudinaryService.deleteImage(publicId);
  // }
}
