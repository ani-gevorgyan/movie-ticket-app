import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities';
import { SeatEntity } from '../seat/seat.entity';
import { ScreeningEntity } from '../screening/screening.entity';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @Column()
  name: string;

  // The width for seat amount
  @Column({ type: 'int' })
  width: number;

  // The length for seat amount
  @Column({ type: 'int' })
  length: number;

  @OneToMany(() => SeatEntity, (seat) => seat.room)
  seats: SeatEntity[];

  @OneToMany(() => ScreeningEntity, (screening) => screening.room)
  screenings: ScreeningEntity[];
}
