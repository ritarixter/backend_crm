import {
  IsString,
  Length,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(2, 50)
  nameCompany: string; //Название компании

  @IsString()
  @Length(2, 50)
  name: string; //ФИО контактного лица компании

  @Length(10)
  @IsString()
  INN: string; //ИНН Компании

  @Length(3, 15)
  @IsString()
  numberPhone: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;
}
