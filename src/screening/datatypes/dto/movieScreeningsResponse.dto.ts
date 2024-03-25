import { Expose } from 'class-transformer';
import { ScreeningResponseDto } from './screeningResponse.dto';

export class MovieScreeningsResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  screenings: ScreeningResponseDto[];
}
