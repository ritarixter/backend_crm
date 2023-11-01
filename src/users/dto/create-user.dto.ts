import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  name: string;

  @IsOptional()
  avatar?: string;

  @IsString()
  @Length(3, 20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  access: string;
}
