import { SeatEntity } from '../../../seat/seat.entity';
import { TicketResponseDto } from '../../../ticket/datatypes/dto/ticketResponse.dto';
import { TicketEntity } from '../../../ticket/ticket.entity';

export function mapTicketToDto(
  ticket: TicketEntity,
  seats: SeatEntity[],
): TicketResponseDto {
  if (!ticket) return null;

  const { id, screeningId, user } = ticket;

  return {
    id,
    screeningId,
    user,
    seats: seats.map((seat) => {
      return {
        id: seat.id,
        row: seat.row,
        column: seat.column,
        room: seat.room,
      };
    }),
  };
}
