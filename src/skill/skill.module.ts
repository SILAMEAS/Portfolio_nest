import {Module} from '@nestjs/common';
import {SkillService} from './skill.service';
import {SkillController} from './skill.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {SkillEntity} from "./entities/skill.entity";
import {ImageSkillEntity} from "./entities/image.skill.entity";

@Module({
  imports:[TypeOrmModule.forFeature([SkillEntity,ImageSkillEntity]),CloudinaryModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
