import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../common/repositories/crud.repository';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketRepository extends CrudRepository<TicketEntity> {
  constructor(
    @InjectRepository(TicketEntity) repository: Repository<TicketEntity>,
  ) {
    super(repository);
  }

  async findTicketWithScreenigSeats(ticketId: string): Promise<TicketEntity> {
    return this.repository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.screeningSeats', 'screeningSeats')
      .where('ticket.id = :ticketId', { ticketId })
      .getOne();
  }

  async findTicketsByUserId(userId: string): Promise<TicketEntity[]> {
    return this.repository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.screeningSeats', 'screeningSeats')
      .leftJoinAndSelect('ticket.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
