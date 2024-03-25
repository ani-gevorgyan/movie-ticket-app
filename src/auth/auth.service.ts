import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UNAUTHORIZED_ERROR_MESSAGE,
  USER_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../common/constants/errorMessages';
import {
  CustomerLoginRequestData,
  UserSignUpRequestData,
  UserLoginResponseData,
  UserSignUpResponseData,
} from '../user/datatypes/internal/user';
import { UserRole } from '../common/constants/user';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { MovieService } from '../movie/movie.service';
import { RoomService } from '../room/room.service';
import { ScreeningService } from '../screening/screening.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private movieService: MovieService,
    private roomService: RoomService,
    private screeningServie: ScreeningService,
  ) {}

  async login(
    loginRequestData: CustomerLoginRequestData,
  ): Promise<UserLoginResponseData> {
    const { email, password } = loginRequestData;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR_MESSAGE);
    }
    const isPasswordMatching = await this.isPasswordMatching(
      password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR_MESSAGE);
    }

    return {
      accessToken: await this.tokenService.generateToken(user.id),
    };
  }

  async signup(
    signupRequestData: UserSignUpRequestData,
  ): Promise<UserSignUpResponseData> {
    const { email, password } = signupRequestData;

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR_MESSAGE);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    signupRequestData = {
      ...signupRequestData,
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    };

    const newUser = await this.userService.createUser(signupRequestData);
    const token = await this.tokenService.generateToken(newUser.id);

    return {
      email: newUser.email,
      accessToken: token,
    };
  }

  async isPasswordMatching(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}
