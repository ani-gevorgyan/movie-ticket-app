import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/services';
import { SeatEntity } from './seat.entity';
import { SeatRepository } from './seat.repository';
import { CreateSeatData } from './datatypes/internal/seat';

@Injectable()
export class SeatService extends CrudService<SeatEntity> {
  constructor(private seatRepository: SeatRepository) {
    super(seatRepository);
  }

  async createSeat(seatData: CreateSeatData): Promise<SeatEntity> {
    return this.seatRepository.create(seatData);
  }

  async getSeatsByRoomId(roomId: string): Promise<SeatEntity[]> {
    return this.seatRepository.findSeatsByRoomId(roomId);
  }
}
