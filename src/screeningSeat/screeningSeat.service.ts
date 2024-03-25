import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/services';
import { ScreeningSeatEntity } from './screeningSeat.entity';
import { ScreeningSeatRepository } from './screeningSeat.repository';

@Injectable()
export class ScreeningSeatService extends CrudService<ScreeningSeatEntity> {
  constructor(private screeningSeatRepository: ScreeningSeatRepository) {
    super(screeningSeatRepository);
  }
}
