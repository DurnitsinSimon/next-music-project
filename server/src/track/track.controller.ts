import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment } from './schemas/comment.schema';
import { Track } from './schemas/track.schema';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({summary: 'Create a track'})
  @ApiResponse({status: 201, type: Track})
  @UseGuards(JwtAuthGuard)
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

  @ApiOperation({summary: 'Getting tracks'})
  @ApiResponse({status: 200, type: [Track]})
  @Get()
  async getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @ApiOperation({summary: 'Search track'})
  @ApiResponse({status: 200, type: Track})
  @Get('search')
  async search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @ApiOperation({summary: 'Find track by id'})
  @ApiResponse({status: 200, type: Track})
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @ApiOperation({summary: 'Delete by id'})
  @ApiResponse({status: 200, type: Track})
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @ApiOperation({summary: 'Add comment by create-comment-dto'})
  @ApiResponse({status: 200, type: Comment})
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addComment')
  async addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @ApiOperation({summary: 'Listen track by id'})
  @ApiResponse({status: 200, type: Track})
  @Post('listen/:id')
  async listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
