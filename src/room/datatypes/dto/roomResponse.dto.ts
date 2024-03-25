import { Expose } from 'class-transformer';

export class RoomResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  width: number;

  @Expose()
  length: number;

  @Expose()
  screenings: ScreeningDto[];

  @Expose()
  seats?: SeatDto[];
}

class ScreeningDto {
  id: string;
  start: Date;
  end: Date;
  price: number;
  room: string;
}

class SeatDto {
  id: string;
  row: number;
  column: number;
}
