import { IsOptional, IsString, Length } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateCommercialProposalDto {
    products?: object[];

    @IsOptional()
    @IsString()
    @Length(2, 30)
    name?: string;

    variablesForMarginality: object[];

    summaSale: string;
    summaBuy: string;
}
