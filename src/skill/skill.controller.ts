import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

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
        name:{
          type:'string',
          example:"name of skill"
        },
        description:{
          type:'string',
          example:"description of skill"
        },
        percent:{
          type:'string',
          example:"percent of skill"
        }
      },
    },
  })
  async create(@UploadedFile() image: Express.Multer.File,@Body() body) {
    if(image&&body)
      return this.skillService.create(image,body);
    else throw new BadRequestException("Image is required")
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(+id);
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
        name:{
          type:'string',
          example:"name of skill"
        },
        description:{
          type:'string',
          example:"description of skill"
        },
        percent:{
          type:'string',
          example:"percent of skill"
        }
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body,@UploadedFile() image: Express.Multer.File) {
    return await this.skillService.update(+id, body,image);
  }

  /** all project all image_project all image in server on cloudinary */
  @Delete("/all")
  async removeAll() {
    return await this.skillService.removeAll();
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.skillService.remove(+id);
  }
}
