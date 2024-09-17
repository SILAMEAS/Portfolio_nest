import {Column, Entity} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";
import {ApiProperty} from "@nestjs/swagger";

@Entity("project")
export class ProjectEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    title:string;
    @Column()
    @ApiProperty()
        // text -> description
    description:string;
    @Column()
    @ApiProperty()
        // src -> image
    image:string;
    @Column()
    @ApiProperty()
        // url -> link
    link:string;
}
