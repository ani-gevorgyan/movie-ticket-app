import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, ConfigService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
