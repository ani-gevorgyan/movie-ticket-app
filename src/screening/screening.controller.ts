import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Query,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ScreeningService } from './screening.service';
import { CreateScreeningRequestDto } from './datatypes/dto/createScreening.dto';
import { ScreeningFilterDto } from './datatypes/dto/screeningFilter.dto';
import { UpdateScreeningRequestDto } from './datatypes/dto/updateScreening.dto';
import { MovieScreeningsResponseDto } from './datatypes/dto/movieScreeningsResponse.dto';
import { mapMovieScreeningToDto } from '../common/utils/mappers/mapMovieScreeningToDto';
import { mapScreeningToDto } from '../common/utils/mappers/mapScreeningToDto';
import { ScreeningResponseDto } from './datatypes/dto/screeningResponse.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('screenings')
export class ScreeningController {
  constructor(private screeningService: ScreeningService) {}

  @Get()
  async getAllScreenings(
    @Query() params: ScreeningFilterDto,
  ): Promise<MovieScreeningsResponseDto[]> {
    const screenings = await this.screeningService.getAllScreenings(params);
    return screenings.map((screening) => mapMovieScreeningToDto(screening));
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async createScreening(
    @Body() body: CreateScreeningRequestDto,
  ): Promise<ScreeningResponseDto> {
    const screening = await this.screeningService.createScreening(body);
    return mapScreeningToDto(screening);
  }

  @Get('/room/:roomId')
  async getAllScreeningsOfTheRoom(
    @Param('roomId', new ParseUUIDPipe()) roomId: string,
  ): Promise<MovieScreeningsResponseDto[]> {
    const screenings =
      await this.screeningService.getScreeningsByRoomId(roomId);
    return screenings.map((screening) => mapMovieScreeningToDto(screening));
  }

  @Put('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async updateScreening(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateScreeningRequestDto,
  ): Promise<ScreeningResponseDto> {
    const updatedScreening = await this.screeningService.updateScreening(
      id,
      body,
    );
    return mapScreeningToDto(updatedScreening);
  }

  @Get('/:id')
  async getScreeningById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ScreeningResponseDto> {
    const screening = await this.screeningService.getScreeningById(id);
    return mapScreeningToDto(screening);
  }

  @Delete('/:id')
  async deleteScreening(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.screeningService.deleteScreening(id);
  }
}
