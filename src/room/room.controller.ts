import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomRequestDto } from './datatypes/dto/createRoom.dto';
import { mapRoomToDto } from '../common/utils/mappers/mapRoomToDto.mapper';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { RoomResponseDto } from './datatypes/dto/roomResponse.dto';
import { UpdateRoomRequestDto } from './datatypes/dto/updateRoom.dto';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get()
  async getAllRooms(): Promise<RoomResponseDto[]> {
    const rooms = await this.roomService.getRoomsWithScreeningsAndSeats();
    return rooms.map((room) => mapRoomToDto(room));
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async createRoom(
    @Body() body: CreateRoomRequestDto,
  ): Promise<RoomResponseDto> {
    const room = await this.roomService.createRoom(body);
    return mapRoomToDto(room);
  }

  @Get('/:id')
  async getRoomById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RoomResponseDto> {
    const room = await this.roomService.getRoomById(id);
    return mapRoomToDto(room);
  }

  @Put('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async updateRoom(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRoomRequestDto,
  ): Promise<RoomResponseDto> {
    const room = await this.roomService.updateRoom(id, body);
    return mapRoomToDto(room);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteRoom(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.roomService.deleteRoom(id);
  }
}
