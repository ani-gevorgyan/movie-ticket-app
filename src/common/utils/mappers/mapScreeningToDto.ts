import { ScreeningResponseDto } from '../../../screening/datatypes/dto/screeningResponse.dto';
import { ScreeningEntity } from '../../../screening/screening.entity';

export function mapScreeningToDto(
  screening: ScreeningEntity,
): ScreeningResponseDto {
  if (!screening) return null;
  const { id, start, end, price, movie, room } = screening;
  return {
    id,
    start,
    end,
    price,
    movieId: movie,
    roomId: room,
    screeningSeats: screening.screeningSeats.map((screeningSeat) => {
      return {
        id: screeningSeat.id,
        isAvailable: screeningSeat.isAvailable,
        seat: screeningSeat.seat,
      };
    }),
  };
}
