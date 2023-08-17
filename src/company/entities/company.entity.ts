import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';
import { List } from 'src/lists/entities/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Column()
  nameCompany: string; //Название компании

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string; //ФИО контактного лица компании

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  INN: string; //ФИО контактного лица компании

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  email: string; //Email компании

  @IsNotEmpty()
  @IsString()
  @Column()
  numberPhone: string;

  @OneToMany(() => List, (list) => list.company)
  lists?: List[];

}
