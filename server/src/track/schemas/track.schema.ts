import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @ApiProperty({example: 'Benz track', description: 'Track name'})
  @Prop()
  name: string;

  @ApiProperty({example: 'Lil peep', description: 'The name of the artist'})
  @Prop()
  artist: string;

  @ApiProperty({example: 'SOME TEXT', description: 'Track text'})
  @Prop()
  text: string;

  @ApiProperty({example: 10, description: 'The number of the track listens'})
  @Prop()
  listens: number;

  @ApiProperty({example: 'http://localhost:3000/image/id', description: 'Image source'})
  @Prop()
  picture: string;

  @ApiProperty({example: 'http://localhost:3000/audio/id', description: 'Audio source'})
  @Prop()
  audio: string;

  @ApiProperty({example: '[{id: 1,...}]', description: 'The array of the comments tracks'})
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[];

}

export const TrackSchema = SchemaFactory.createForClass(Track);
