import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectEntity} from "./entities/project.entity";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import { ImageProjectEntity} from "./entities/image.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity,ImageProjectEntity]),CloudinaryModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
