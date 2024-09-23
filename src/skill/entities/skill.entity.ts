import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";
import {ApiProperty} from "@nestjs/swagger";
import {ImageSkillEntity} from "./image.skill.entity";

@Entity("skill")
export class SkillEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    name:string;
    @Column()
    @ApiProperty()
    percent:string;
    @Column()
    @ApiProperty()
    description:string;
    @OneToOne(() => ImageSkillEntity, (image) => image.skill, { cascade: true })
    @JoinColumn() // Only necessary on one side of the relationship (typically the owning side)
    image: ImageSkillEntity;
}
