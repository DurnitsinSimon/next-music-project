import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ConfigModule.forRoot({
        envFilePath: '.env',
      }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      })
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
