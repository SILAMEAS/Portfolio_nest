import {Column, Entity, OneToOne} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";
import {ApiProperty} from "@nestjs/swagger";
import {ProfileEntity} from "../../profile/entities/profile.entity";
import {ProjectEntity} from "./project.entity";

@Entity("image_project")
export class ImageProjectEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    public_id:string;
    @Column()
    @ApiProperty()
    url:string;
    @Column()
    @ApiProperty()
    format:string;
    @OneToOne(() => ProjectEntity, (project) => project.image)
    project: ProjectEntity;
}