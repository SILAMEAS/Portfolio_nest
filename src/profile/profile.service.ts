import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(ProfileEntity)
  private profileRepository: Repository<ProfileEntity>) {}
  private queryBuilder = this.profileRepository.createQueryBuilder("profile");
  async create(createProfileDto: CreateProfileDto) {
    const exitedOne=await this.findAll();
    if(exitedOne?.length>1){
     throw new BadRequestException('profile exited one show cannot add more');
    }
    return this.profileRepository.save(createProfileDto);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOneBy({id})
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    const found=this.findOne(id)
    if(found){
      const updated = this.profileRepository
        .createQueryBuilder()
        .update('profile')
        .set(updateProfileDto)
        .where("id = :id", { id: id })
        .execute()
      return this.findOne(id);
    }
    throw new BadRequestException('User not found');
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
