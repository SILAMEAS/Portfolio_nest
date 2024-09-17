import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectEntity} from "./entities/project.entity";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity]),CloudinaryModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
