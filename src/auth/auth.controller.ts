import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  signin(@Body() authDto:AuthDto){
    return this.authService.signin(authDto);

  }
}
