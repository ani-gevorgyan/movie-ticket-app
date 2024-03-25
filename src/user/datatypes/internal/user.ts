import { UserRole } from '../../../common/constants/user';

export type UserSignUpRequestData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
};

export type UserData = {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};

export type CustomerLoginRequestData = {
  email: string;
  password: string;
};

export type UserSignUpResponseData = {
  email: string;
  accessToken: string;
};

export type UserLoginResponseData = {
  accessToken: string;
};
