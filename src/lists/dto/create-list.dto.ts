import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string;

  @IsNotEmpty()
  @IsString()
  customer: string; //'компания' или фио менеджера кормленый

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @Length(10)
  INNCompany: string;

  files?: object[];
}
