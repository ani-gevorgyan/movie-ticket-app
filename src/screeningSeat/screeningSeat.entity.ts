import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from '../common/entities';
import { ScreeningEntity } from '../screening/screening.entity';
import { SeatEntity } from '../seat/seat.entity';
import { TicketEntity } from '../ticket/ticket.entity';

@Entity({ name: 'screeningSeats' })
export class ScreeningSeatEntity extends BaseEntity {
  @Column()
  isAvailable: boolean;

  @ManyToOne(() => ScreeningEntity, (screening) => screening.screeningSeats, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('screening')
  screening: string;

  @ManyToOne(() => SeatEntity, (seat) => seat.screeningSeats, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('seat')
  seat: string;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.screeningSeats, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('ticket')
  ticket: string;
}
