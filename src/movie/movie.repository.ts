import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { MovieEntity } from './movie.entity';
import { getCurrentAndNextDays } from '../common/utils/getCurrentAndNextDays';
import { ScreeningFilter } from '../screening/datatypes/internal/screening';

@Injectable()
export class MovieRepository extends CrudRepository<MovieEntity> {
  constructor(
    @InjectRepository(MovieEntity) repository: Repository<MovieEntity>,
  ) {
    super(repository);
  }

  async findAllMoviesWithScreenings(): Promise<MovieEntity[]> {
    return this.repository.find({ relations: ['screenings'] });
  }

  async findMovieByIdWithScreening(id: string): Promise<MovieEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['screenings'],
    });
  }

  async findAllMovieScreeningsOfTheRoom(
    roomId: string,
  ): Promise<MovieEntity[]> {
    const { currentDay, nextDay } = getCurrentAndNextDays();
    const query = await this.repository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.screenings', 'screenings')
      .leftJoinAndSelect('screenings.room', 'room')
      .leftJoinAndSelect('screenings.screeningSeats', 'screeningSeats')
      .where('screenings.start >= :currentDay', { currentDay })
      .andWhere('screenings.end <= :nextDay', { nextDay })
      .andWhere('room.id = :roomId', { roomId });
    return query.getMany();
  }

  async findAllMovieScreenings(
    filter: ScreeningFilter,
  ): Promise<MovieEntity[]> {
    const query = await this.repository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.screenings', 'screenings')
      .leftJoinAndSelect('screenings.screeningSeats', 'screeningSeats');
    if (filter.today) {
      const { currentDay, nextDay } = getCurrentAndNextDays();
      query
        .where('screenings.start >= :currentDay', { currentDay })
        .andWhere('screenings.end <= :nextDay', { nextDay });
    }
    return query.getMany();
  }
}
