import { SeatEntity } from '../../../seat/seat.entity';
import { TicketEntity } from '../../ticket.entity';

export type CreateTicketRequestData = {
  screeningId: string;
  seatsIds: string[];
};

export type Ticket = {
  id: string;
  screeningId: string;
  user: string;
  screeningSeats: ScreeningSeat[];
};

type ScreeningSeat = {
  id: string;
  isAvailable: boolean;
  seat: string;
};

export type TicketResponse = {
  id: string;
  user: string;
  screeningId: string;
  seats: Seat[];
};

export type Seat = {
  id: string;
  row: number;
  column: number;
  room: string;
};

export type TicketSeats = {
  tickets: TicketEntity[];
  seats: SeatEntity[];
};
