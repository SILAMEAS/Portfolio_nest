import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity} from "typeorm";
import {AbstractEntity} from "../../utils/abstract/AbstractEntity";

@Entity("profile")
export class ProfileEntity extends AbstractEntity{
    @Column()
    @ApiProperty()
    label:string;
    @Column()
    @ApiProperty()
    mainLabel:string;
    @Column()
    @ApiProperty()
    title:string;
    @Column()
    @ApiProperty()
    mainTitle:string;
    @Column()
    @ApiProperty()
    description:string;
}
