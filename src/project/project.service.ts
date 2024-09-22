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
        private imageProjectEntityRepository: Repository<ImageProjectEntity>,
        private cloudinaryService:CloudinaryService
    ) {}
  async create(image: Express.Multer.File,createProjectDto: CreateProjectDto) {
   try {
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
        const found=await this.projectEntityRepository.findOne({where:{id},relations: ['image']})
        if(found){
            return found;
        }
      throw new BadRequestException('User not found');
  }

  async update(id: number, updateProjectDto: UpdateProjectDto,image: Express.Multer.File) {
      const found=await this.findOne(+id);
      if(image){
          try {
              /** upload new image */
              const uploaded:any=await this.cloudinaryService.uploadImage(image);
              /** if upload new image success*/
              if(uploaded){
                  /** after upload already to cloudinary create this image in table img project */
                  const createImgUploaded = this.imageProjectEntityRepository.create({public_id:uploaded?.public_id, url: uploaded?.url,format:uploaded?.format });
                  /** save to table img project */
                  await this.imageProjectEntityRepository.save(createImgUploaded);
                  /** delete old image*/
                  await this.imageProjectEntityRepository.delete(found.image.public_id)
                  /** update data in table project */
                  try {
                      await this.projectEntityRepository
                          .createQueryBuilder()
                          .update('project')
                          .set({...found,title:updateProjectDto.title,link:updateProjectDto.link,description:updateProjectDto.description,image:createImgUploaded})
                          .where("id = :id", {id: id})
                          .execute()

                      return await this.findOne(id);
                  }catch (e){
                      return  new Error("update project error : "+e);
                  }
              }
          }catch (e){
              return  new BadRequestException('uploading image failed');
          }

      }else {
          /** update data in table project */
          try {
              await this.projectEntityRepository
                  .createQueryBuilder()
                  .update('project')
                  .set({...found,title:updateProjectDto.title,link:updateProjectDto.link,description:updateProjectDto.description})
                  .where("id = :id", {id: id})
                  .execute()

              return await this.findOne(id);
          }catch (e){
              throw new Error("update project error : "+e);
          }
      }
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
