import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { MovieModule } from '../movie/movie.module';
import { MovieService } from '../movie/movie.service';
import { MovieRepository } from '../movie/movie.repository';
import { RoomModule } from '../room/room.module';
import { RoomService } from '../room/room.service';
import { RoomRepository } from '../room/room.repository';
import { SeatModule } from '../seat/seat.module';
import { SeatRepository } from '../seat/seat.repository';
import { SeatService } from '../seat/seat.service';
import { ScreeningModule } from '../screening/screening.module';
import { ScreeningSeatModule } from '../screeningSeat/screeningSeat.module';
import { ScreeningService } from '../screening/screening.service';
import { ScreeningRepository } from '../screening/screening.repository';
import { ScreeningSeatService } from '../screeningSeat/screeningSeat.service';
import { ScreeningSeatRepository } from '../screeningSeat/screeningSeat.repository';

@Module({
  imports: [
    UserModule,
    TokenModule,
    MovieModule,
    RoomModule,
    SeatModule,
    ScreeningModule,
    ScreeningSeatModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    TokenService,
    ConfigService,
    JwtService,
    MovieService,
    MovieRepository,
    RoomService,
    RoomRepository,
    SeatService,
    SeatRepository,
    ScreeningService,
    ScreeningRepository,
    ScreeningSeatService,
    ScreeningSeatRepository,
  ],
})
export class AuthModule {}
