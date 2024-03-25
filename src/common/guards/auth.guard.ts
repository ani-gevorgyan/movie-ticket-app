import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_TOKEN_PREFIX } from '../constants/token';
import { TokenService } from '../../token/token.service';
import { UNAUTHORIZED_REQUEST_ERROR_MESSAGE } from '../constants/errorMessages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    let token;

    if (authorization && authorization.startsWith(AUTH_TOKEN_PREFIX)) {
      token = authorization.split(' ')[1];
    }
    if (!token) {
      throw new UnauthorizedException(UNAUTHORIZED_REQUEST_ERROR_MESSAGE);
    }
    const decoded = await this.tokenService.verifyAccessToken(token);
    const decodedData = JSON.stringify(decoded);
    request['user'] = JSON.parse(decodedData).id;
    return true;
  }
}
