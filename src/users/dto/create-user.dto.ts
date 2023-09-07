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
  @MinLength(2)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 40)
  name: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 15)
  access: string;
}
