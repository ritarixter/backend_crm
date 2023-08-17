import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CommercialProposal } from 'src/commercial-proposal/entities/commercial-proposal.entity';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';

export class UpdateListDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  endDate: Date;

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
