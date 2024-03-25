import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities';
import { ScreeningEntity } from '../screening/screening.entity';

@Entity({ name: 'movies' })
export class MovieEntity extends BaseEntity {
  @Column()
  title: string;

  // Duration of a movie in minutes.
  @Column({ type: 'int' })
  duration: number;

  @OneToMany(() => ScreeningEntity, (screening) => screening.movie)
  screenings: ScreeningEntity[];
}
