import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends CrudRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: { email },
    });
  }
}
