import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import * as mongoose from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { AddTrackDto } from './dto/add-track.dto';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateAlbumDto,
    picture: Express.Multer.File,
  ): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return this.albumModel.create({ ...dto, picture: picturePath });
  }

  async getAll(): Promise<Album[]> {
    return this.albumModel.find();
  }

  async getById(id: mongoose.Types.ObjectId): Promise<Album> {
    const trackWithListens = await this.sumListens(id);
    console.log('log');
    
    return this.albumModel.findById(id).populate('tracks');
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<Album> {
    return this.albumModel.findByIdAndDelete(id);
  }

  async addTrack(dto: AddTrackDto) {
    const album = await this.albumModel.findById(dto.albumId);
    const track = await this.trackModel.findById(dto.trackId);
    album.tracks.push(track._id);
    track.album = album._id;
    await album.save();
    await track.save();
    return album.populate('tracks');
  }

  async sumListens(id: mongoose.Types.ObjectId) {
    return this.albumModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: 'Track',
          localField: '_id',
          foreignField: 'album',
          as: 'track',
        },
      },
      {
        $addFields: {
          listens: { $sum: '$track.listens' },
        },
      },
    ]);
  }
}
