import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from '../common/entities';
import { RoomEntity } from '../room/room.entity';
import { MovieEntity } from '../movie/movie.entity';
import { ScreeningSeatEntity } from '../screeningSeat/screeningSeat.entity';

@Entity({ name: 'screenings' })
export class ScreeningEntity extends BaseEntity {
  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => RoomEntity, (room) => room.screenings, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('room')
  room: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.screenings, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  @RelationId('movie')
  @JoinColumn()
  movie: string;

  @OneToMany(
    () => ScreeningSeatEntity,
    (screeningSeat) => screeningSeat.screening,
  )
  screeningSeats: ScreeningSeatEntity[];
}
