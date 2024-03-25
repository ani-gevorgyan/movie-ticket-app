import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ScreeningService } from './screening.service';
import { ScreeningEntity } from './screening.entity';
import { ScreeningRepository } from './screening.repository';
import { MovieModule } from '../movie/movie.module';
import { MovieRepository } from '../movie/movie.repository';
import { ScreeningSeatModule } from '../screeningSeat/screeningSeat.module';
import { ScreeningSeatRepository } from '../screeningSeat/screeningSeat.repository';
import { SeatModule } from '../seat/seat.module';
import { SeatRepository } from '../seat/seat.repository';
import { ScreeningController } from './screening.controller';
import { RoomModule } from '../room/room.module';
import { RoomRepository } from '../room/room.repository';
import { RoomService } from '../room/room.service';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreeningEntity]),
    MovieModule,
    SeatModule,
    ScreeningSeatModule,
    RoomModule,
    UserModule,
    TokenModule,
  ],
  providers: [
    ScreeningService,
    ScreeningRepository,
    MovieRepository,
    SeatRepository,
    ScreeningSeatRepository,
    RoomRepository,
    RoomService,
    ConfigService,
    JwtService,
  ],
  controllers: [ScreeningController],
  exports: [TypeOrmModule, ScreeningService],
})
export class ScreeningModule {}
