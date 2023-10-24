import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';
import { List } from 'src/lists/entities/list.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Notify } from 'src/notify/entities/notify.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsNotEmpty()
  @IsString()
  @Length(2, 40)
  @Column()
  name: string; //ФИО

  @IsOptional()
  @IsString()
  @Column()
  phone: string; //ФИО

  @IsOptional()
  @IsString()
  @Column({default:'/'})
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  @Column()
  access: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Column({
    unique: true,
  })
  username: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  @Column({ select: false })
  password: string;

  @ManyToMany(() => Plan, () => Plan)
  plans?: Plan[];

  @ManyToMany(() => CommercialProposal, () => CommercialProposal)
  @JoinTable()
  commercialProposals?: CommercialProposal[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => List, () => List)
  list: List[];

  @ManyToMany(() => Notify, (notify) => notify.users)
  @JoinTable({ name: 'notify_users' })
  notifications: Notify[];

  @OneToMany(() => Comment, (comment) => comment.list)
  comments?: Comment[];
}
