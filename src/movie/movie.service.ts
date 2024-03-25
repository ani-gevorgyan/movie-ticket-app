import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../common/services';
import { MovieEntity } from './movie.entity';
import { MovieRepository } from './movie.repository';
import {
  CreateMovieRequestData,
  UpdateMovieRequest,
} from './datatypes/internal/movie';
import { MOVIE_DOES_NOT_EXIST_ERROR_MESSAGE } from '../common/constants/errorMessages';

@Injectable()
export class MovieService extends CrudService<MovieEntity> {
  constructor(private movieRepository: MovieRepository) {
    super(movieRepository);
  }

  async createMovie(movieData: CreateMovieRequestData): Promise<MovieEntity> {
    return this.movieRepository.create(movieData);
  }

  async getAllMovies(): Promise<MovieEntity[]> {
    return this.movieRepository.findAllMoviesWithScreenings();
  }

  async updateMovie(
    id: string,
    movieData: UpdateMovieRequest,
  ): Promise<MovieEntity> {
    await this.getMovieById(id);
    await this.movieRepository.update(id, movieData);
    return this.movieRepository.findMovieByIdWithScreening(id);
  }

  async getMovieById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findMovieByIdWithScreening(id);
    if (!movie) {
      throw new NotFoundException(MOVIE_DOES_NOT_EXIST_ERROR_MESSAGE);
    }
    return movie;
  }

  async deleteMovie(id: string): Promise<void> {
    await this.getMovieById(id);
    return this.movieRepository.delete(id);
  }
}
