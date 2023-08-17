import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  nameCompany?: string; //Название компании

  @IsOptional()
  @IsString()
  name?: string; //ФИО контактного лица компании

  @IsOptional()
  @Length(10)
  @IsString()
  INN?: string; //ИНН Компании

  @IsOptional()
  @IsString()
  numberPhone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
