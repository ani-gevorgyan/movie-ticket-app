import { Expose } from 'class-transformer';

export class MovieResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  posterLink: string;

  @Expose()
  screenings: ScreeningDto[];
}

class ScreeningDto {
  id: string;
  start: Date;
  end: Date;
  price: number;
  room: string;
}
