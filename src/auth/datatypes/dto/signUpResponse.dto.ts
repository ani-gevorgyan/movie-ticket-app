import { Expose } from 'class-transformer';

export class SignUpResponseDto {
  @Expose()
  email: string;

  @Expose()
  accessToken: string;
}
