import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

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


    async validatePassword?(password: string): Promise<boolean> {
        const [salt, hashedPassword] = this.password.split('-');
        const compareHash = await bcrypt.hash(password, salt);
    
        return compareHash === hashedPassword;
      }

}
