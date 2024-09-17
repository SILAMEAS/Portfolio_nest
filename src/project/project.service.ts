import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProjectEntity} from "./entities/project.entity";
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {ImageProjectEntity} from "./entities/image.entity";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectEntityRepository: Repository<ProjectEntity>,
        @InjectRepository(ImageProjectEntity)
        private imageRepository: Repository<ImageProjectEntity>,
        private cloudinaryService:CloudinaryService
    ) {}
  async create(image: Express.Multer.File,createProjectDto: CreateProjectDto) {
   try {
       const uploaded:any=await this.cloudinaryService.uploadImage(image);
       if(uploaded){
           const image = this.imageRepository.create({public_id:uploaded?.public_id, url: uploaded?.url,format:uploaded?.format });
           await this.imageRepository.save(image);

           const profile = this.projectEntityRepository.create({
               ...createProjectDto,
               image: image,
           });
           return this.projectEntityRepository.save(profile);
       }else {
           return  new BadRequestException('uploading image failed');
       }

   }catch (e){
     throw new Error(e)
   }
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
