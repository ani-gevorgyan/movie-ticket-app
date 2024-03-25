import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreateTicketRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  screeningId: string;

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  seatsIds: string[];
}
