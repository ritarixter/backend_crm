import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateWorkDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name?: string;
}
