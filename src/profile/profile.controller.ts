import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateProfileDto } from './profile-dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Post('addProfile')
  createUserProfile(@GetUser('id') id:string, @Body() createUserProfileDto:CreateProfileDto){

    return this.profileService.create(id, createUserProfileDto);
  }

}
