import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Todo } from "src/todo/entities/todo.entity";
import { Profile } from "src/profile/entity/profile.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    firstName: string;

    @Column({nullable:true})
    lastName:string;

    @Column({unique:true})
    email:string;

    @Column()
    @Exclude()
    password:string;

    @OneToMany(() => Todo, (todo)=>todo.user)
    todos: Todo[];

    @OneToOne(type => Profile) @JoinColumn() 
    profile: Profile;


    async validatePassword?(password: string): Promise<boolean> {
        const [salt, hashedPassword] = this.password.split('-');
        const compareHash = await bcrypt.hash(password, salt);
    
        return compareHash === hashedPassword;
      }

}
