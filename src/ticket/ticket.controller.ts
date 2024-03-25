import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketRequestDto } from './datatypes/dto/createTicketRequest.dto';
import {
  CreateTicketResponseDto,
  TicketResponseDto,
} from './datatypes/dto/ticketResponse.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RequestWithUser } from '../common/datatypes/auth';
import { mapTicketToDto } from 'src/common/utils/mappers/mapTicketsToDto.mapper';
import { TicketEntity } from './ticket.entity';

@Controller('ticket')
@UseGuards(AuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getAllTicketsOfAUser(
    @Req() request: RequestWithUser,
  ): Promise<TicketResponseDto[]> {
    const { tickets, seats } = await this.ticketService.getTicketsByUserId(
      request.user,
    );
    return tickets.map((ticket: TicketEntity) => mapTicketToDto(ticket, seats));
  }

  @Post()
  async buyTicket(
    @Req() request: RequestWithUser,
    @Body() body: CreateTicketRequestDto,
  ): Promise<CreateTicketResponseDto> {
    return this.ticketService.createTicket(body, request.user);
  }
}
