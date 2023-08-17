import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  worksId: number[];

  @IsOptional()
  usersId?: number[];
}
