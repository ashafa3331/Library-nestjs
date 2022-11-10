import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@GetUser('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@GetUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@GetUser('id') id: string) {
    return this.userService.remove(id);
  }
}
