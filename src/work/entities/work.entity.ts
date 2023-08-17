import { IsNotEmpty, IsString } from 'class-validator';
import { List } from 'src/lists/entities/list.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ManyToMany(() => Plan, () => Plan)
  plan: Plan[];
}
