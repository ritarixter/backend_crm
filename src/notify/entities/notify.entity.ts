import { IsString } from "class-validator";
import { List } from "src/lists/entities/list.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notify {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.notifications)
    users: User[];

    @ManyToOne(() => List, (list) => list.notifications)
    @JoinColumn({ name: 'listId' })
    list: List;

    @IsString()
    @Column()
    message:string;
    
    @Column({default:false})
    isWatched:boolean
}
