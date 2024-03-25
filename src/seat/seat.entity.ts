import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from '../common/entities';
import { RoomEntity } from '../room/room.entity';
import { ScreeningSeatEntity } from '../screeningSeat/screeningSeat.entity';

@Entity({ name: 'seats' })
export class SeatEntity extends BaseEntity {
  @Column({ type: 'int' })
  row: number;

  @Column({ type: 'int' })
  column: number;

  @ManyToOne(() => RoomEntity, (room) => room.seats, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('room')
  room: string;

  @OneToMany(() => ScreeningSeatEntity, (screeningSeat) => screeningSeat.seat)
  screeningSeats: ScreeningSeatEntity[];
}
