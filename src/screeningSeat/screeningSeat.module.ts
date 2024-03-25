import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningSeatService } from './screeningSeat.service';
import { ScreeningSeatEntity } from './screeningSeat.entity';
import { ScreeningSeatRepository } from './screeningSeat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningSeatEntity])],
  providers: [ScreeningSeatService, ScreeningSeatRepository],
  exports: [TypeOrmModule, ScreeningSeatService],
})
export class ScreeningSeatModule {}
