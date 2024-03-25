import { IsOptional, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class ScreeningFilterDto {
  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  today: boolean;
}
