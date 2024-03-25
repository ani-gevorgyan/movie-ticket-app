import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { ScreeningSeatEntity } from './screeningSeat.entity';

@Injectable()
export class ScreeningSeatRepository extends CrudRepository<ScreeningSeatEntity> {
  constructor(
    @InjectRepository(ScreeningSeatEntity)
    repository: Repository<ScreeningSeatEntity>,
  ) {
    super(repository);
  }

  async findscreeningSeatWithRowAndColumn(
    screeningSeatId: string,
  ): Promise<ScreeningSeatEntity> {
    return this.repository
      .createQueryBuilder('screeningSeat')
      .leftJoinAndSelect('screeningSeat.seat', 'seat')
      .where('seat.id = :screeningSeatId', { screeningSeatId })
      .select(['seat.row', 'seat.colummn'])
      .getOne();
  }
}
