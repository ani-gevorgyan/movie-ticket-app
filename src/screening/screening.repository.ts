import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { ScreeningEntity } from './screening.entity';
import { getCurrentAndNextDays } from '../common/utils/getCurrentAndNextDays';
import { ScreeningFilter } from './datatypes/internal/screening';

@Injectable()
export class ScreeningRepository extends CrudRepository<ScreeningEntity> {
  constructor(
    @InjectRepository(ScreeningEntity) repository: Repository<ScreeningEntity>,
  ) {
    super(repository);
  }

  async getScreeningsByRoomId(roomId: string): Promise<ScreeningEntity[]> {
    return this.repository
      .createQueryBuilder('screening')
      .leftJoinAndSelect('screening.room', 'room')
      .where('room.id = :roomId', { roomId })
      .getMany();
  }

  async findAllScreeningsOfTheDay(
    filter: ScreeningFilter,
  ): Promise<ScreeningEntity[]> {
    const query = await this.repository
      .createQueryBuilder('screening')
      .leftJoinAndSelect('screening.screeningSeats', 'screeningSeats');
    if (filter.today) {
      const { currentDay, nextDay } = getCurrentAndNextDays();
      query
        .where('screening.start >= :currentDay', { currentDay })
        .andWhere('screening.end <= :nextDay', { nextDay });
    }
    return query.getMany();
  }

  async findScreeningWithScreeningSeatsById(
    id: string,
  ): Promise<ScreeningEntity> {
    return this.repository.findOne({
      where: { id },
      relations: ['screeningSeats'],
    });
  }
}
