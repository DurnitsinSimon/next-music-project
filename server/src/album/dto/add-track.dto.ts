import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddTrackDto {
  @IsString()
  trackId: ObjectId;

  @IsString()
  albumId: ObjectId;
}
