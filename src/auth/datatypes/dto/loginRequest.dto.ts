import { Expose } from 'class-transformer';
import { TransformToLowerCase } from '../../../common/utils/transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @Expose()
  @TransformToLowerCase()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}
