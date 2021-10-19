import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @ApiProperty({example: 'User name', description: 'User name'})
  @Prop()
  username: string;

  @ApiProperty({example: '[track id]', description: 'track id'})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;

  @ApiProperty({example: 'I like this track', description: 'comment text'})
  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
