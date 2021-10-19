import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addFavoriteTrack')
  async addFavoriteTrack(@Body() body, @Request() req) {
    return this.userService.addFavoriteTrack(req.user.email, body.trackId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getFavoriteTracks')
  async getFavoriteTracks(@Request() req) {
      return this.userService.getFavoriteTracks(req.user.email);
  }
}
