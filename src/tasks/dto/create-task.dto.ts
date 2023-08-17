import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
    
  @IsNotEmpty()
  @IsString()
  @Length(2, 40)
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done:boolean;

  @IsNotEmpty()
  @IsString()
  status:string;

  @IsNotEmpty()
  endDate: Date;
  
  @IsOptional()
  @Length(0, 200)
  description?: string

  user?:User;
}
