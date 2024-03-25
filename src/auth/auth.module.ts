import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    TokenService,
    ConfigService,
    JwtService,
  ],
})
export class AuthModule {}
