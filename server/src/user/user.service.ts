import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.';
import { User, UserDocument } from './schemas/user.schema';
import { ALREADY_CREATED_USER, NOT_VALID_PASSWORD, USER_NOT_FOUND } from './user.constants';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(dto: CreateUserDto): Promise<User> {
        const oldUser = await this.userModel.findOne({email: dto.email});
        if(oldUser) {
            throw new HttpException(ALREADY_CREATED_USER, HttpStatus.BAD_REQUEST);
        }
        
        const salt = genSaltSync(10);

        const user = new this.userModel({
            email: dto.email,
            passwordHash: hashSync(dto.password, salt)
        });

        return user.save();
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email});
        if(!user) {
            throw new BadRequestException(USER_NOT_FOUND);
        }
        return user;
    }

    async validateUser(dto: CreateUserDto): Promise<User>{
        const user = await this.findUserByEmail(dto.email);
        const isCorrectPassword = await compare(dto.password, user.passwordHash);
        if(!isCorrectPassword) {
            throw new HttpException(NOT_VALID_PASSWORD, HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}
