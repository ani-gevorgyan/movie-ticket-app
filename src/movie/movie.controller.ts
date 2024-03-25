import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { mapMovieToDto } from '../common/utils/mappers/mapMovieToDto.mapper';
import { MovieResponseDto } from './datatypes/dto/movieResponse.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { CreateMovieRequestDto } from './datatypes/dto/createMovieRequest.dto';
import { UpdateMovieRequestDto } from './datatypes/dto/updateMovieRequest.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieService.getAllMovies();
    return movies.map((movie) => mapMovieToDto(movie));
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async createMovie(
    @Body() body: CreateMovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = await this.movieService.createMovie(body);
    return mapMovieToDto(movie);
  }

  @Put('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async updateMovie(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateMovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = await this.movieService.updateMovie(id, body);
    return mapMovieToDto(movie);
  }

  @Get('/:id')
  async getMovieById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MovieResponseDto> {
    const movie = await this.movieService.getMovieById(id);
    return mapMovieToDto(movie);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteMovie(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.movieService.deleteMovie(id);
  }
}
