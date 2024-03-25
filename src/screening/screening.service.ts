import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudService } from '../common/services';
import { ScreeningEntity } from './screening.entity';
import { ScreeningRepository } from './screening.repository';
import { MovieRepository } from '../movie/movie.repository';
import { MovieEntity } from '../movie/movie.entity';
import { ScreeningSeatRepository } from '../screeningSeat/screeningSeat.repository';
import { SeatRepository } from '../seat/seat.repository';
import { SeatEntity } from '../seat/seat.entity';
import {
  INVALID_ROOM_ID_ERROR_MESSAGE,
  INVALID_SCREENING_START_TIME_ERROR_MESSAGE,
  MOVIE_DOES_NOT_EXIST_ERROR_MESSAGE,
  PAST_SCREENING_START_TIME_ERROR_MESSAGE,
  ROOM_DOES_NOT_EXIST_ERROR_MESSAGE,
  SCREENING_DOES_NOT_EXITS_ERROR_MESSAGE,
} from '../common/constants/errorMessages';
import { ScreeningFilterDto } from './datatypes/dto/screeningFilter.dto';
import { RoomRepository } from '../room/room.repository';
import {
  UpdateScreeningData,
  CreateScreeningData,
  ScreeningData,
} from './datatypes/internal/screening';

@Injectable()
export class ScreeningService extends CrudService<ScreeningEntity> {
  constructor(
    private screeningRepository: ScreeningRepository,
    private movieRepository: MovieRepository,
    private seatRepository: SeatRepository,
    private screeningSeatRepository: ScreeningSeatRepository,
    private roomRepository: RoomRepository,
  ) {
    super(screeningRepository);
  }

  async createScreening(
    createScreeningData: CreateScreeningData,
  ): Promise<ScreeningEntity> {
    const { start, movieId, roomId } = createScreeningData;
    const movie = await this.movieRepository.getById(movieId);
    if (!movie) {
      throw new NotFoundException(MOVIE_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    const endTime = this.calculateEndTime(start, movie);
    await this.validateScreening({
      end: endTime,
      ...createScreeningData,
    });
    const screening = await this.screeningRepository.create({
      end: endTime,
      movie: movieId,
      room: roomId,
      ...createScreeningData,
    });
    const seats = await this.seatRepository.findSeatsByRoomId(roomId);
    if (!seats.length) {
      throw new BadRequestException(INVALID_ROOM_ID_ERROR_MESSAGE);
    }
    await Promise.all(
      seats.map((seat: SeatEntity) =>
        this.screeningSeatRepository.create({
          screening: screening.id,
          isAvailable: true,
          seat: seat.id,
        }),
      ),
    );
    return this.screeningRepository.findScreeningWithScreeningSeatsById(
      screening.id,
    );
  }

  calculateEndTime(start: Date, movie: MovieEntity): Date {
    const time = new Date(start).getTime();
    return new Date(time + movie.duration * 60000);
  }

  async validateScreening(screeningData: ScreeningData): Promise<void> {
    const currentDayTime = new Date();
    if (screeningData.start < currentDayTime) {
      throw new BadRequestException(PAST_SCREENING_START_TIME_ERROR_MESSAGE);
    }
    const existingScreenings =
      await this.screeningRepository.getScreeningsByRoomId(
        screeningData.roomId,
      );
    if (existingScreenings && existingScreenings.length) {
      if (
        screeningData.start <
        existingScreenings[existingScreenings.length - 1].end
      ) {
        throw new BadRequestException(
          INVALID_SCREENING_START_TIME_ERROR_MESSAGE,
        );
      }
    }
  }

  async getAllScreenings(filter: ScreeningFilterDto): Promise<MovieEntity[]> {
    return this.movieRepository.findAllMovieScreenings(filter);
  }

  async getScreeningById(id: string): Promise<ScreeningEntity> {
    const screening =
      await this.screeningRepository.findScreeningWithScreeningSeatsById(id);
    if (!screening) {
      throw new NotFoundException(SCREENING_DOES_NOT_EXITS_ERROR_MESSAGE);
    }
    return screening;
  }

  async getScreeningsByRoomId(roomId: string): Promise<MovieEntity[]> {
    return this.movieRepository.findAllMovieScreeningsOfTheRoom(roomId);
  }

  async updateScreening(
    id: string,
    screeningData: UpdateScreeningData,
  ): Promise<ScreeningEntity> {
    await this.getScreeningById(id);
    const { start, movieId, roomId, price } = screeningData;
    const movie = await this.movieRepository.getById(movieId);
    if (!movie) {
      throw new NotFoundException(MOVIE_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    const room = await this.roomRepository.getById(roomId);
    if (!room) {
      throw new NotFoundException(ROOM_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    const endTime = this.calculateEndTime(start, movie);
    await this.validateScreening({ end: endTime, ...screeningData });
    await this.screeningRepository.update(id, {
      end: endTime,
      room: roomId,
      movie: movieId,
      price,
      start,
    });
    return this.screeningRepository.findScreeningWithScreeningSeatsById(id);
  }

  async deleteScreening(id: string): Promise<void> {
    await this.getScreeningById(id);
    return this.screeningRepository.delete(id);
  }
}
