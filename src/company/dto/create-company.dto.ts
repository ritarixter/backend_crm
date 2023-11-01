import { IsString, Length, IsOptional, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(2, 50)
  nameCompany: string; //Название компании

  @IsString()
  @Length(2, 50)
  name: string; //ФИО контактного лица компании

  @IsString()
  @Length(10, 12)
  INN: string; //ИНН Компании

  @IsString()
  @Length(3, 20)
  numberPhone: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;
}
