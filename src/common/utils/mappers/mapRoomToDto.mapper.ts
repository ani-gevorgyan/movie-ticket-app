import { RoomResponseDto } from '../../../room/datatypes/dto/roomResponse.dto';
import { RoomEntity } from '../../../room/room.entity';

export function mapRoomToDto(room: RoomEntity): RoomResponseDto {
  if (!room) return null;
  const { id, name, width, length } = room;
  return {
    id,
    name,
    width,
    length,
    screenings: room.screenings?.map((screening) => {
      return {
        id: screening.id,
        start: screening.start,
        end: screening.end,
        price: screening.price,
        room: screening.room,
      };
    }),
    seats: room.seats?.map((seat) => {
      return {
        id: seat.id,
        row: seat.row,
        column: seat.column,
      };
    }),
  };
}
