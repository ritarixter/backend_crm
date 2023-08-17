import { IsOptional, IsString } from 'class-validator';

export class UpdatePlanDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  worksId: number[];

  @IsOptional()
  usersId?: number[];
}
