import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';


export class UpdateListDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 120)
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  endDate?: string;

  endDateForCP?: string;

  endDateForInspection?: string;

  endDateForFitters?:string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  importance?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  status?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  idCompany?: number;

  @IsOptional()
  users?:number[];

  @IsOptional()
  commercialProposal?: CommercialProposal;

  @IsOptional()
  works?: number[];

  files?: object[];
}
