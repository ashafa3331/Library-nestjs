import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    title:string;

    @Column({nullable:true})
    todos: string;


    @ManyToOne(() => User, (user)=>user.todos)
    user:User;
}
