import { Expose } from 'class-transformer';

export class TicketResponseDto {
  @Expose()
  id: string;

  @Expose()
  screeningId: string;

  @Expose()
  user: string;

  @Expose()
  seats: SeatDto[];
}

class SeatDto {
  id: string;
  row: number;
  column: number;
  room: string;
}

class ScreeningSeatsDto {
  isAvailable: boolean;
  seat: string;
}

export class CreateTicketResponseDto {
  @Expose()
  id: string;

  @Expose()
  screeningId: string;

  @Expose()
  user: string;

  @Expose()
  screeningSeats: ScreeningSeatsDto[];
}
