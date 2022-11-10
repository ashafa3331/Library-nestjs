import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entity/profile.entity';
import { CreateProfileDto } from './profile-dto/profile.dto';

@Injectable()
export class ProfileService {

 

  constructor(
  
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}


  async create( id: string, createProfileDto: CreateProfileDto ) {
    console.log(id);
    
   const user =  await this.userRepository.findOne({where:{id}});
   
   if(!user){
    throw new HttpException('user not found',HttpStatus.BAD_REQUEST);
   }
   delete user.password;
     const newProfile =this.profileRepository.create(createProfileDto);
    const  saveProfile = await this.profileRepository.save(newProfile);

    user.profile = saveProfile;

    return this.userRepository.save(user);


  }

//   update(id: string, updateTodoDto: UpdateTodoDto) {
//     return this.todoRepository.update(id, updateTodoDto);
//   }

//   remove(id: string) {
//     return this.todoRepository.delete(id)
//   }

}
