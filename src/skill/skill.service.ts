import {BadRequestException, Delete, Injectable, Param} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ProjectEntity} from "../project/entities/project.entity";
import {Repository} from "typeorm";
import {ImageProjectEntity} from "../project/entities/image.entity";
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {ImageSkillEntity} from "./entities/image.skill.entity";
import {SkillEntity} from "./entities/skill.entity";
import {UpdateProjectDto} from "../project/dto/update-project.dto";

@Injectable()
export class SkillService {
  constructor(
      @InjectRepository(SkillEntity)
      private skillEntityRepository: Repository<SkillEntity>,
      @InjectRepository(ImageSkillEntity)
      private imageSkillEntityRepository: Repository<ImageSkillEntity>,
      private cloudinaryService:CloudinaryService
  ) {}
  async create(image: Express.Multer.File,createSkillDto: CreateSkillDto) {
    try {
      const uploaded:any=await this.cloudinaryService.uploadImage(image);
      if(uploaded){
        const image = this.imageSkillEntityRepository.create({public_id:uploaded?.public_id, url: uploaded?.url,format:uploaded?.format });
        await this.imageSkillEntityRepository.save(image);

        const skill = this.skillEntityRepository.create({
          ...createSkillDto,
          image: image,
        });
        return this.skillEntityRepository.save(skill);
      }else {
        return  new BadRequestException('uploading image failed');
      }

    }catch (e){
      throw new Error("create skill error "+e)
    }
  }

  findAll() {
    return this.skillEntityRepository.find({
      relations: ['image']
    })
  }

  async findOne(id: number) {
    const found=await this.skillEntityRepository.findOne({where:{id},relations: ['image']})
    if(found){
      return found;
    }
    throw new BadRequestException('skill not found');
  }
  async updateProject(id:number,updateSkillDto:UpdateSkillDto){
    try {
      await this.skillEntityRepository.update(id, {name:updateSkillDto.name,description:updateSkillDto.description,percent:updateSkillDto.percent});
      return await this.findOne(id);
    }catch (e){
      throw new Error("update skill error : "+e);
    }
  }
  async update(id: number, updateSkillDto: UpdateSkillDto,image: Express.Multer.File) {
    console.log('updateSkillDto',updateSkillDto)
    const found = await this.findOne(+id);
    if(image){
      try {
        const uploaded:any=await this.cloudinaryService.uploadImage(image);
        if(uploaded){
          const imageAfterUpload = this.imageSkillEntityRepository.create({public_id:uploaded?.public_id, url: uploaded?.url,format:uploaded?.format });
          await this.imageSkillEntityRepository.save(imageAfterUpload);
          await this.skillEntityRepository.update(id, {
            ...updateSkillDto,
            image: imageAfterUpload,
          });
          await this.cloudinaryService.deleteImage(found.image.public_id);
          return await this.findOne(id);
        }else {
          return  new BadRequestException('uploading image failed');
        }

      }catch (e){
        throw new Error(" uploadToCloudinarySaveDB : "+e)
      }
    }
    await this.skillEntityRepository.update(id, {
      name:updateSkillDto.name,
      percent:updateSkillDto.percent,
      description:updateSkillDto.description
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const found = await this.findOne(id);
    await this.findOne(id);
    await this.skillEntityRepository.delete(+id);
    await this.cloudinaryService.deleteImage(found.image.public_id);
    return this.findAll();
  }
  /** all project all image_project all image in server on cloudinary */
  @Delete("/all")
  async removeAll() {
    const images = await this.imageSkillEntityRepository.find();
    if (images.length === 0) {
      throw new Error('No images found');
    }
    const publicIds = images.map(image => image.public_id);
    await this.skillEntityRepository.delete({});
    await this.cloudinaryService.deleteMultipleImages(publicIds);
    await this.imageSkillEntityRepository.delete({});
    return this.findAll();
  }
}
