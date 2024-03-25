import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRoomRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  length: number;
}
