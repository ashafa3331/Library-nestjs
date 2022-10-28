import { Injectable } from '@nestjs/common';
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
    return await this.userRepository.findOne({where:{id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto){
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
