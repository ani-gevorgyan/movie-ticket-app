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
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
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
    const accessToken = await this.tokenService.generateToken(user.id);

    return {
      accessToken,
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
