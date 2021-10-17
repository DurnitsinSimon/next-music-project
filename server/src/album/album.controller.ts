import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import * as mongoose from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackDto } from './dto/add-track.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  @Post()
  async create(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
    },
    @Body() dto: CreateAlbumDto,
  ) {
    const { picture } = files;
    return this.albumService.create(dto, picture[0]);
  }

  @Get()
  async getAll() {
    return this.albumService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: mongoose.Types.ObjectId) {
    return this.albumService.getById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: mongoose.Types.ObjectId) {
    return this.albumService.deleteById(id);
  }

  @Post('addTrack')
  async addTrack(@Body() dto: AddTrackDto) {
      return this.albumService.addTrack(dto);
  }
}
