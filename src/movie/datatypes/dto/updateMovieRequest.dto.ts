import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateMovieRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
