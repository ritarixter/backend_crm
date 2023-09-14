import { IsString, Length } from 'class-validator';
import { Company } from 'src/company/entities/company.entity';
import { List } from 'src/lists/entities/list.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';

@Entity()
export class CommercialProposal {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @IsString()
  @Length(2, 30)
  @Column()
  name: string;

  @Column('jsonb', {nullable: true})
  products?: object[];

  @OneToOne(() => List, (list) => list.commercialProposal)
  list: List;

  @Column({nullable: true})
  summa: string;

  @Column({nullable: true})
  marginality: string;

  @Column('jsonb', {nullable: true})
  variablesForMarginality: Array<object>;

}
