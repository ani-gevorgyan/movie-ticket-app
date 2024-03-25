import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from './seat.service';
import { SeatEntity } from './seat.entity';
import { SeatRepository } from './seat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SeatEntity])],
  providers: [SeatService, SeatRepository],
  exports: [TypeOrmModule, SeatService],
})
export class SeatModule {}
