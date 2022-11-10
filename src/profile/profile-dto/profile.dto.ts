import { IsString } from "class-validator";

export class CreateProfileDto{
    
    @IsString()
    address: string;

    @IsString()
    phone:string;

    @IsString()
    gender:string;
}