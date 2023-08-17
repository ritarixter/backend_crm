import { IsNotEmpty, IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  done?:boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?:string;

  @IsOptional()
  @IsNotEmpty()
  endDate?: Date;

  @IsOptional()
  @Length(1, 200)
  description?: string
}
