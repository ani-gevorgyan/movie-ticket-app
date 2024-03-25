import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../common/services';
import { RoomEntity } from './room.entity';
import { RoomRepository } from './room.repository';
import { CreateRoomData, UpdateRoomData } from './datatypes/internal/room';
import { SeatService } from '../seat/seat.service';
import { ROOM_DOES_NOT_EXIST_ERROR_MESSAGE } from '../common/constants/errorMessages';

@Injectable()
export class RoomService extends CrudService<RoomEntity> {
  constructor(
    private roomRepository: RoomRepository,
    private seatService: SeatService,
  ) {
    super(roomRepository);
  }

  async createRoom(roomData: CreateRoomData): Promise<RoomEntity> {
    const { width, length } = roomData;
    const room = await this.roomRepository.create(roomData);
    for (let row = 1; row <= length; row++) {
      for (let column = 1; column <= width; column++) {
        await this.seatService.createSeat({ row, column, room: room.id });
      }
    }
    return room;
  }

  async getRoomWithSeats(roomId: string): Promise<RoomEntity> {
    return this.roomRepository.findRoomWithSeats(roomId);
  }

  async getRoomsWithScreeningsAndSeats(): Promise<RoomEntity[]> {
    return this.roomRepository.findRoomsWithScreeningsAndSeats();
  }

  async getRoomById(id: string): Promise<RoomEntity> {
    const room = await this.roomRepository.findRoomWithScreeningsByRoomId(id);
    if (!room) {
      throw new NotFoundException(ROOM_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    return room;
  }

  async updateRoom(id: string, roomData: UpdateRoomData): Promise<RoomEntity> {
    await this.getRoomById(id);
    await this.roomRepository.update(id, roomData);
    return this.roomRepository.findRoomWithScreeningsByRoomId(id);
  }

  async deleteRoom(id: string): Promise<void> {
    await this.getRoomById(id);
    return this.roomRepository.delete(id);
  }
}
