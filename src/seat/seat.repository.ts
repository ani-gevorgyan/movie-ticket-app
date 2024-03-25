import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { SeatEntity } from './seat.entity';

@Injectable()
export class SeatRepository extends CrudRepository<SeatEntity> {
  constructor(
    @InjectRepository(SeatEntity) repository: Repository<SeatEntity>,
  ) {
    super(repository);
  }

  async findSeatsByRoomId(roomId: string): Promise<SeatEntity[]> {
    return this.repository
      .createQueryBuilder('seat')
      .leftJoinAndSelect('seat.room', 'room')
      .where('room.id = :roomId', { roomId })
      .getMany();
  }

  async findSeatWithScreeningSeat(seatId: string): Promise<SeatEntity> {
    return this.repository.findOne({
      where: {
        id: seatId,
      },
      relations: ['screeningSeats'],
    });
  }

  async findSeatByIdAndScreeningSeatId(
    screeningSeatId: string,
    seatId: string,
  ): Promise<SeatEntity> {
    return this.repository
      .createQueryBuilder('seat')
      .where('seat.id = :seatId', { seatId })
      .getOne();
  }
}
