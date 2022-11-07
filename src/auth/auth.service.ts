import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { passwordencrypt } from 'src/user/helper/password-hash';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthDto } from './authDto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>, private jwt:JwtService
      ) {}


      async signUp(createUserDto: CreateUserDto) {
        const user =  this.authRepository.create(createUserDto);
         user.password = await passwordencrypt(user.password);

        
        return this.authRepository.save(user);
    
      }

      async signin(authauthdto:AuthDto){

        const {email} = authauthdto
        const user = await this.authRepository.findOne({where:{email}});
         

        if(!user) throw new NotFoundException("credential not valide");

        const isPasswordMatch = await user.validatePassword(authauthdto.password);

        if(isPasswordMatch != true) throw new UnauthorizedException("creadentials not valid");
        
        return this.signinToken(user.id,user.email);
      }


       async signinToken(id:string, email:string):Promise<{access_token:string}>{

        const payload={
          sub: id,
          email,
        };

        const token =  await this.jwt.signAsync(payload,{expiresIn:"15m",secret:"aaaaa11111^^%GGG"});

        return {access_token: token };
      }
}
