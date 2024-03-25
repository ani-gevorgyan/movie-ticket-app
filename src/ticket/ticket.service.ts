import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudService } from '../common/services';
import { TicketEntity } from './ticket.entity';
import { TicketRepository } from './ticket.repository';
import { ScreeningRepository } from '../screening/screening.repository';
import { ScreeningSeatRepository } from '../screeningSeat/screeningSeat.repository';
import { SeatRepository } from '../seat/seat.repository';
import { SeatEntity } from 'src/seat/seat.entity';
import {
  CreateTicketRequestData,
  Ticket,
  TicketSeats,
} from './datatypes/internal/ticket';
import {
  MOVIE_SCREENING_OVER_ERROR_MESSAGE,
  SCREENING_DOES_NOT_EXITS_ERROR_MESSAGE,
  SEAT_DOES_NOT_EXIST_ERROR_MESSAGE,
} from '../common/constants/errorMessages';

@Injectable()
export class TicketService extends CrudService<TicketEntity> {
  constructor(
    private ticketRepository: TicketRepository,
    private screeningRepository: ScreeningRepository,
    private screeningSeatRepository: ScreeningSeatRepository,
    private seatRepository: SeatRepository,
  ) {
    super(ticketRepository);
  }

  async getTicketsByUserId(userId: string): Promise<TicketSeats> {
    const tickets = await this.ticketRepository.findTicketsByUserId(userId);
    const allSeats = await Promise.all(
      tickets.map((ticket) =>
        Promise.all(
          ticket.screeningSeats.map((screeningSeat) =>
            this.seatRepository.findSeatWithScreeningSeat(screeningSeat.seat),
          ),
        ),
      ),
    );
    const seats = allSeats.flat();
    return { tickets, seats };
  }

  async createTicket(
    ticketData: CreateTicketRequestData,
    userId: string,
  ): Promise<Ticket> {
    const { seatsIds, screeningId } = ticketData;
    const seats = await Promise.all(
      seatsIds.map((seatId: string) =>
        this.seatRepository.findSeatWithScreeningSeat(seatId),
      ),
    );
    await this.validateTicket(seats, screeningId);
    const newTicket = await this.ticketRepository.create({
      user: userId,
      screeningId,
    });
    await Promise.all(
      seats.map((seat) =>
        this.screeningSeatRepository.update(seat.screeningSeats[0].id, {
          isAvailable: false,
          ticket: newTicket.id,
        }),
      ),
    );
    return this.ticketRepository.findTicketWithScreenigSeats(newTicket.id);
  }

  async validateTicket(
    seats: SeatEntity[],
    screeningId: string,
  ): Promise<void> {
    const screening = await this.screeningRepository.getById(screeningId);
    if (!screening) {
      throw new NotFoundException(SCREENING_DOES_NOT_EXITS_ERROR_MESSAGE);
    }
    const currentTime = new Date();
    if (currentTime.getTime() > screening.end.getTime()) {
      throw new BadRequestException(MOVIE_SCREENING_OVER_ERROR_MESSAGE);
    }
    await this.validateScreeningSeats(seats);
  }

  async validateScreeningSeats(seats: SeatEntity[]): Promise<void> {
    await Promise.all(seats.map(async (seat) => await this.validateSeat(seat)));
  }

  async validateSeat(seat: SeatEntity): Promise<void> {
    if (!seat) {
      throw new NotFoundException(SEAT_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    if (!seat.screeningSeats.length) {
      throw new NotFoundException(SEAT_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    if (!seat.screeningSeats[0].isAvailable) {
      throw new BadRequestException(
        `Seat ${seat.row} ${seat.column} is already occupied, please select another seat!`,
      );
    }
  }
}
