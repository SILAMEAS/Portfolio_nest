import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";
import {ApiProperty} from "@nestjs/swagger";
import {ImageProjectEntity} from "./image.entity";

@Entity("project")
export class ProjectEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    title:string;
    @Column()
    @ApiProperty()
    description:string;
    @Column()
    @ApiProperty()
    link:string;
    @OneToOne(() => ImageProjectEntity, (image) => image.project, { cascade: true })
    @JoinColumn() // Only necessary on one side of the relationship (typically the owning side)
    image: ImageProjectEntity;
}
