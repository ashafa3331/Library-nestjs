import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { OneToMany } from "typeorm";

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    todos:string;

    @IsString()
    @IsNotEmpty()
    title:string;


    @OneToMany(() => User, (user)=>user.todos)
    user:User;

}
