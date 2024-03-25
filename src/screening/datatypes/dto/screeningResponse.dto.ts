import { Expose } from 'class-transformer';

export class ScreeningResponseDto {
  @Expose()
  id: string;

  @Expose()
  movieId: string;

  @Expose()
  roomId: string;

  @Expose()
  price: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  screeningSeats: ScreeningSeatDto[];
}

export class ScreeningSeatDto {
  id: string;
  isAvailable: boolean;
  seat: string;
}
