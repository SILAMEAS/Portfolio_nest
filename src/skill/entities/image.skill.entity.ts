import {Column, Entity, OneToOne} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";
import {ApiProperty} from "@nestjs/swagger";
import {SkillEntity} from "./skill.entity";


@Entity("image_skill")
export class ImageSkillEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    public_id:string;
    @Column()
    @ApiProperty()
    url:string;
    @Column()
    @ApiProperty()
    format:string;
    @OneToOne(() => SkillEntity, (skill) => skill.image)
    skill: SkillEntity;
}