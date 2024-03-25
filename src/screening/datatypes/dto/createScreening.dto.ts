import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScreeningRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start: Date;
}
