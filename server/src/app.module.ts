import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TrackModule,
    FileModule,
    AlbumModule,
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
   
  ]
})
export class AppModule {}
