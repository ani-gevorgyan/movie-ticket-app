import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomRepository extends CrudRepository<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity) repository: Repository<RoomEntity>,
  ) {
    super(repository);
  }

  async findRoomWithSeats(roomId: string): Promise<RoomEntity> {
    return this.repository.findOne({
      where: { id: roomId },
      relations: ['seats'],
    });
  }

  async findRoomsWithScreeningsAndSeats(): Promise<RoomEntity[]> {
    return this.repository.find({ relations: ['screenings', 'seats'] });
  }

  async findRoomWithScreeningsByRoomId(id: string): Promise<RoomEntity> {
    return this.repository.findOne({
      where: { id },
      relations: ['screenings', 'seats'],
    });
  }
}
