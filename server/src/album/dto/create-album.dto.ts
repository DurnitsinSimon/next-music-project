import { IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsString()
  author: string;
}
