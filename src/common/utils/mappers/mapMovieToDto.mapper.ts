import { MovieResponseDto } from '../../../movie/datatypes/dto/movieResponse.dto';
import { MovieEntity } from '../../../movie/movie.entity';

export function mapMovieToDto(movie: MovieEntity): MovieResponseDto {
  const { id, duration, title } = movie;
  if (!movie) return null;
  return {
    id,
    duration,
    title,
    screenings: movie.screenings?.map((screening) => {
      return {
        id: screening.id,
        start: screening.start,
        end: screening.end,
        price: screening.price,
        room: screening.room,
      };
    }),
  };
}
