import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { passwordencrypt } from './helper/password-hash';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  

  async findAll() {

    return await this.userRepository.find();
  }

  async findOne(id:string):Promise<User> {
    return await this.userRepository.findOne({where:{id},relations:['todos','profile']});
  }

  async update(id: string, updateUserDto: UpdateUserDto){
     
    try{
       await this.userRepository.update(id, updateUserDto);

       const updatedUser = this.userRepository.findOne({where:{id}});
       delete (await updatedUser).password;

       return updatedUser;

    }catch(error){
      throw new ServiceUnavailableException("fail to update user");
    }
    

  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
