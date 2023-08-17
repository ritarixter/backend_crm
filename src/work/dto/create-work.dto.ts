import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string;

}
