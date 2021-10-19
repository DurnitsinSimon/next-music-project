import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Benz track', description: 'Track name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Lil peep', description: 'The name of the artist' })
  @IsString()
  readonly artist: string;

  @ApiProperty({ example: 'SOME TEXT', description: 'Track text' })
  @IsString()
  readonly text: string;
}
