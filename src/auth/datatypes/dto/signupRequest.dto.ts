import { Expose } from 'class-transformer';
import { TransformToLowerCase } from '../../../common/utils/transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Match } from '../../../common/decorators/match.decorator';

export class SignUpRequestDto {
  @Expose()
  @TransformToLowerCase()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Match('password')
  confirmPassword: string;
}
