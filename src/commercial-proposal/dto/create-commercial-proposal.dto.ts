import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCommercialProposalDto {
  idList: number;

  products: object[];

  @IsString()
  @Length(2, 30)
  name: string;
}
