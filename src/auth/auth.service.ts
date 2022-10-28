import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { passwordencrypt } from 'src/user/helper/password-hash';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
      ) {}


      async signUp(createUserDto: CreateUserDto) {
        const user =  this.authRepository.create(createUserDto);
         user.password = await passwordencrypt(user.password);
        return this.authRepository.save(user);
    
      }
}
