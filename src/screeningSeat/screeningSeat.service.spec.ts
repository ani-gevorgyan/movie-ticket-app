import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningSeatService } from './screeningSeat.service';

describe('ScreeningSeatService', () => {
  let service: ScreeningSeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningSeatService],
    }).compile();

    service = module.get<ScreeningSeatService>(ScreeningSeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
