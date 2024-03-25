import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from '../common/entities';
import { UserRole } from '../common/constants/user';
import { TicketEntity } from '../ticket/ticket.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @MaxLength(16)
  @MinLength(4)
  password: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @OneToMany(() => TicketEntity, (ticket) => ticket.user)
  tickets: TicketEntity[];
}
