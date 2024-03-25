import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UNAUTHORIZED_REQUEST_ERROR_MESSAGE } from '../common/constants/errorMessages';
import { JWT_EXPIRATION, JWT_SECRET } from '../common/constants/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateToken(userId: string): Promise<string> {
    const jwtSecret = this.configService.get(JWT_SECRET);
    const jwtExpresIn = this.configService.get(JWT_EXPIRATION);
    return this.generateJwtToken(userId, jwtSecret, jwtExpresIn);
  }

  async verifyAccessToken(payload: string): Promise<never> {
    try {
      return this.jwtService.verify(payload, {
        secret: this.configService.get(JWT_SECRET),
      });
    } catch (err) {
      throw new UnauthorizedException(UNAUTHORIZED_REQUEST_ERROR_MESSAGE);
    }
  }

  generateJwtToken(userId: string, key: string, expiresIn: string): string {
    return this.jwtService.sign({ id: userId }, { secret: key, expiresIn });
  }
}
