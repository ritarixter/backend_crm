import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  description?: string;
}
