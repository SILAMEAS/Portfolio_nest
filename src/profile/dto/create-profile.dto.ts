import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({ example: 'Sila', description: 'The label of the profile' })
    @IsNotEmpty({message:"label cannot be empty"})
    @IsString({message:"label cannot be empty"})
    label:string;
    @ApiProperty({ example: 'Developer', description: 'The mainLabel of the profile' })
    @IsNotEmpty({message:"mainLabel cannot be empty"})
    @IsString({message:"mainLabel cannot be empty"})
    mainLabel:string;
    @ApiProperty({ example: 'Make anything possible with', description: 'The title of the profile' })
    @IsNotEmpty({message:"title cannot be empty"})
    @IsString({message:"title cannot be empty"})
    title:string;
    @ApiProperty({ example: 'Web Development', description: 'The mainTitle of the profile' })
    @IsNotEmpty({message:"mainTitle cannot be empty"})
    @IsString({message:"mainTitle cannot be empty"})
    mainTitle:string;
    @ApiProperty({ example: 'Hello, I`m Sila. My experience is 2 years with web development. You can contact me if you want to build your website for your business.', description: 'The description of the profile' })
    @IsNotEmpty({message:"description cannot be empty"})
    @IsString({message:"description cannot be empty"})
    description:string;

}
