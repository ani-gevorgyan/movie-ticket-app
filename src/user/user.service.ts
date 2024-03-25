import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/services';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserSignUpRequestData } from './datatypes/internal/user';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findUserByEmail(email);
  }

  async createUser(userData: UserSignUpRequestData): Promise<UserEntity> {
    return this.userRepository.create(userData);
  }
}
