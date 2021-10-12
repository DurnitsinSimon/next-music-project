import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() dto: CreateTrackDto,
  ) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  async getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('addComment')
  async addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Post('listen/:id')
  async listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
