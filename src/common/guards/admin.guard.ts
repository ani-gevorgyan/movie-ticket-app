import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UNAUTHORIZED_REQUEST_ERROR_MESSAGE } from '../constants/errorMessages';
import { UserRole } from '../constants/user';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.getById(request.user);
    if (!user) {
      throw new ForbiddenException(UNAUTHORIZED_REQUEST_ERROR_MESSAGE);
    }
    if (user.role !== UserRole.ADMIN) {
      return false;
    }
    return true;
  }
}
