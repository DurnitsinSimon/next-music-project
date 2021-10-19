
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';


export class CreateCommentDto {
  @ApiProperty({example: 'User name', description: 'User name'})
  @IsString()
  readonly username: string;

  @ApiProperty({example: '[track id]', description: 'track id'})
  @IsString()
  readonly track: ObjectId;

  @ApiProperty({example: 'I like this track', description: 'comment text'})
  @IsString()
  readonly text: string;
}
