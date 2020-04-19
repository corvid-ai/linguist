import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
