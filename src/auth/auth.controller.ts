import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpResponseDto } from './datatypes/dto/signUpResponse.dto';
import { LoginResponseDto } from './datatypes/dto/loginResponse.dto';
import { LoginRequestDto } from './datatypes/dto/loginRequest.dto';
import { SignUpRequestDto } from './datatypes/dto/signupRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signup(body);
  }
}
