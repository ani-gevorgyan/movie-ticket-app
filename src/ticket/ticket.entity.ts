import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from '../common/entities';
import { ScreeningSeatEntity } from '../screeningSeat/screeningSeat.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'tickets' })
export class TicketEntity extends BaseEntity {
  @Column()
  screeningId: string;

  @ManyToOne(() => UserEntity, (user) => user.tickets, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('user')
  user: string;

  @OneToMany(() => ScreeningSeatEntity, (screeningSeat) => screeningSeat.ticket)
  screeningSeats: ScreeningSeatEntity[];
}
