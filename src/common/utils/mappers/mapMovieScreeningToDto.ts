// eslint-disable-next-line max-len
import { MovieScreeningsResponseDto } from '../../../screening/datatypes/dto/movieScreeningsResponse.dto';
import { MovieEntity } from '../../../movie/movie.entity';

export function mapMovieScreeningToDto(
  movieScreening: MovieEntity,
): MovieScreeningsResponseDto {
  if (!movieScreening) return null;
  const { id, title, duration, posterLink } = movieScreening;
  return {
    id,
    title,
    duration,
    posterLink,
    screenings: movieScreening.screenings.map((screening) => {
      return {
        id: screening.id,
        movieId: screening.movie,
        roomId: screening.room,
        start: screening.start,
        end: screening.end,
        price: screening.price,
        screeningSeats: screening.screeningSeats.map((screeningSeat) => {
          return {
            id: screeningSeat.id,
            isAvailable: screeningSeat.isAvailable,
            seat: screeningSeat.seat,
          };
        }),
      };
    }),
  };
}
