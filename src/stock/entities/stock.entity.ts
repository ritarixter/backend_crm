import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @IsNotEmpty()
  @IsString()
  @Column()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  count?: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name?: string;
}
