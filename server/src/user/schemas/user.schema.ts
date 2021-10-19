import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({unique: true})
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  favoriteTracks: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);
