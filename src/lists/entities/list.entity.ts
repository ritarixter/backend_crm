import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';
import { Company } from 'src/company/entities/company.entity';
import { IMediaResponse } from 'src/media/media.interface';
import { Step } from 'src/step/entities/step.entity';
import { User } from 'src/users/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';
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
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @Column()
  name: string;

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

  @IsOptional()
  @IsString()
  @Length(2, 30)
  @Column({ nullable: true })
  description?: string;

  @IsOptional()
  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

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
  @Column({ nullable: true })
  status: string; //Обзятельно!

  @IsOptional()
  @IsString()
  @Length(2, 20)
  @Column({ nullable: true })
  importance: string; //Обзятельно!

  @Column('jsonb', { nullable: true })
  files: object[];
}
