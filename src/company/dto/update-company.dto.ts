import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  nameCompany?: string; //Название компании

  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string; //ФИО контактного лица компании

  @IsOptional()
  @IsString()
  @Length(10, 12)
  INN?: string; //ИНН Компании

  @IsOptional()
  @IsString()
  @Length(3, 20)
  numberPhone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
