import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @IsOptional()
  @Length(2, 200)
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Work, () => Work)
  @JoinTable({ name: 'works_plans' })
  works: Work[];

  @ManyToMany(() => User, () => User)
  @JoinTable({ name: 'users_plans' })
  users?: User[];
}
