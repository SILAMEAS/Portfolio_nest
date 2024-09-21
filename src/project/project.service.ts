import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProjectEntity} from "./entities/project.entity";
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {ImageProjectEntity} from "./entities/image.entity";
import {raw} from "express";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectEntityRepository: Repository<ProjectEntity>,
        @InjectRepository(ImageProjectEntity)
        private imageProjectEntityRepository: Repository<ImageProjectEntity>,
        private cloudinaryService:CloudinaryService
    ) {}
  async create(image: Express.Multer.File,createProjectDto: CreateProjectDto) {
   try {
       console.log(image)
       const uploaded:any=await this.cloudinaryService.uploadImage(image);
       if(uploaded){
           const image = this.imageProjectEntityRepository.create({public_id:uploaded?.public_id, url: uploaded?.url,format:uploaded?.format });
           await this.imageProjectEntityRepository.save(image);

           const profile = this.projectEntityRepository.create({
               ...createProjectDto,
               image: image,
           });
           return this.projectEntityRepository.save(profile);
       }else {
           return  new BadRequestException('uploading image failed');
       }

   }catch (e){
     throw new Error(""+e)
   }
  }

  findAll() {
    return this.projectEntityRepository.find({
        relations: ['image']
    })
  }

  async findOne(id: number) {
        const found=await this.projectEntityRepository.findOne({where:{id},relations: ['image']});
        if(!found) throw new BadRequestException('not found project with this id');
        else return this.projectEntityRepository.findOne({where:{id},relations: ['image']})
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
        await this.findOne(id);
     await this.projectEntityRepository.delete(+id);
      return this.findAll();
  }
  async removeAll() {
      const images = await this.imageProjectEntityRepository.find();
      if (images.length === 0) {
          throw new Error('No images found');
      }
      const publicIds = images.map(image => image.public_id);
      await this.projectEntityRepository.delete({});
      await this.cloudinaryService.deleteMultipleImages(publicIds);
      await this.imageProjectEntityRepository.delete({});
        return this.findAll();
    }
}
