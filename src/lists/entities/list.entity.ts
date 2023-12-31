import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';
import { Company } from 'src/company/entities/company.entity';
import { Step } from 'src/step/entities/step.entity';
import { User } from 'src/users/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Notify } from 'src/notify/entities/notify.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  @Column({ default: '' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 120)
  @Column({ default: '' })
  address: string;

  @ManyToOne(() => Company, (company) => company.lists)
  company: Company;

  @Column()
  customer: string; //'компания' или фио менеджера

  @ManyToMany(() => Work, () => Work)
  @JoinTable({ name: 'list_works' })
  works?: Work[];

  @ManyToMany(() => User, () => User)
  @JoinTable({ name: 'list_users' })
  users: User[];

  // @IsOptional()
  // @IsString()
  // @Length(2, 200)
  // @Column({ nullable: true })
  // description?: string;

  @IsOptional()
  @Column({ nullable: true })
  endDate: string; //ФОРМАТ 2023-10-14 , ДЛЯ Input type="date"

  @IsOptional()
  @Column({ nullable: true })
  endDateForCP: string; //ФОРМАТ 2023-10-14 , ДЛЯ Input type="date" //ДЛЯ КП

  @IsOptional()
  @Column({ nullable: true })
  endDateForInspection: string; //ФОРМАТ 2023-10-14 , ДЛЯ Input type="date" //ДЛЯ ОБСЛЕДОВАНИЯ

  @IsOptional()
  @Column({ nullable: true })
  endDateForFitters: string; //ФОРМАТ 2023-10-14 , ДЛЯ Input type="date" //ДЛЯ ОБСЛЕДОВАНИЯ

  @OneToOne(
    () => CommercialProposal,
    (commercialProposal) => commercialProposal.list,
  )
  @JoinColumn({ name: 'commercial_proposal_Id' })
  commercialProposal: CommercialProposal;

  @OneToOne(() => Step, (step) => step.list)
  @JoinColumn({ name: 'step_Id' })
  step: Step;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  @Column({ default: 'Не назначен' })
  status: string; //Обзятельно!

  @IsOptional()
  @IsString()
  @Length(2, 20)
  @Column({ default: 'Не назначена' })
  importance: string; //Обзятельно!

  @Column('jsonb', { default: [] })
  files: object[];

  @OneToMany(() => Comment, (comment) => comment.list)
  comments?: Comment[];

  @OneToMany(() => Notify, (notify) => notify.list)
  notifications: Notify[];
}
