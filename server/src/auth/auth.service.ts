import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto.';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.userService.validateUser(dto);
    
    return {
      token: await this.generateToken(user),
      user: {
        email: user.email,
        favoriteTracks: user.favoriteTracks
      }
    };
  }

  async registration(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return {
      token: await this.generateToken(user),
      user: {
        email: user.email,
        favoriteTracks: user.favoriteTracks
      }
    };
  }

  async generateToken(user: User) {
    const payload = { email: user.email, favoriteTracks: user.favoriteTracks};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
