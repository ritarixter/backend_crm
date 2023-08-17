import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  description: string;
}
