
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';


export class CreateCommentDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly track: ObjectId;

  @IsString()
  readonly text: string;
}
