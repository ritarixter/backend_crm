import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @CreateDateColumn()
    createdAt?: Date;
  
    @UpdateDateColumn()
    updatedAt?: Date;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 40)
    @Column()
    title: string; //Название задачи

    @IsOptional()
    @IsString()
    @Length(1, 200)
    @Column()
    description?: string; //Название задачи

    @IsNotEmpty()
    @Column({default:false})
    done:boolean;

    @IsNotEmpty()
    @Column({default:'Несрочно'})
    status:string;

    @IsOptional()
    @Column()
    endDate?: Date;
  
    @ManyToOne(()=>User, (user)=>user.tasks)
    user:User
}
