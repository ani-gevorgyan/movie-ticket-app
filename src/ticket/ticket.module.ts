import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketEntity } from './ticket.entity';
import { TicketRepository } from './ticket.repository';
import { ScreeningModule } from '../screening/screening.module';
import { ScreeningRepository } from '../screening/screening.repository';
import { ScreeningSeatModule } from '../screeningSeat/screeningSeat.module';
import { ScreeningSeatRepository } from '../screeningSeat/screeningSeat.repository';
import { SeatModule } from '../seat/seat.module';
import { SeatRepository } from '../seat/seat.repository';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    ScreeningModule,
    ScreeningSeatModule,
    SeatModule,
    TokenModule,
  ],
  providers: [
    TicketService,
    TicketRepository,
    ScreeningRepository,
    ScreeningSeatRepository,
    SeatRepository,
    ConfigService,
    JwtService,
    TokenService,
  ],
  controllers: [TicketController],
  exports: [TypeOrmModule, TicketService],
})
export class TicketModule {}
