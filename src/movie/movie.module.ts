import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { MovieEntity } from './movie.entity';
import { MovieController } from './movie.controller';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), TokenModule, UserModule],
  providers: [
    MovieService,
    MovieRepository,
    TokenService,
    ConfigService,
    JwtService,
    UserService,
    UserRepository,
  ],
  controllers: [MovieController],
  exports: [TypeOrmModule, MovieService],
})
export class MovieModule {}
