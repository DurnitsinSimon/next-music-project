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
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
