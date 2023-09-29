import { IsString } from "class-validator";
import { List } from "src/lists/entities/list.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notify {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, () => User)
    users: User[];

    @ManyToMany(() => List, () => List)
    lists: List[];

    @IsString()
    @Column()
    message:string;
    
    @Column({default:false})
    isWatched:boolean
}
