import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id:string;

    @Column({nullable:true})
    address: string;

    @Column({nullable:true})
    phone:string;

    @Column({unique:true})
    gender:string;

    

}