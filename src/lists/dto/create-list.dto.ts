import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 120)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  customer: string; //'компания' или фио менеджера кормленый

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsString()
  INNCompany: string;

  files?: object[];
}
