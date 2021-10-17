import { Body, Controller, Get, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto.';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async create(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
      const token = await this.authService.generateToken(req.user);
    return {
        ...token,
        user: req.user
    };
  }
}
