import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile")
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;
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
