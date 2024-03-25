import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { SeatModule } from '../seat/seat.module';
import { SeatService } from '../seat/seat.service';
import { SeatRepository } from '../seat/seat.repository';
import { RoomController } from './room.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]),
    SeatModule,
    UserModule,
    TokenModule,
  ],
  providers: [
    RoomService,
    RoomRepository,
    SeatService,
    SeatRepository,
    UserService,
    UserRepository,
    ConfigService,
    JwtService,
    TokenService,
  ],
  controllers: [RoomController],
  exports: [TypeOrmModule, RoomService],
})
export class RoomModule {}
