import { Module } from '@nestjs/common';
import { CommercialProposalService } from './commercial-proposal.service';
import { CommercialProposalController } from './commercial-proposal.controller';
import { CommercialProposal } from './entities/commercial-proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from 'src/lists/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommercialProposal]), ListModule],
  controllers: [CommercialProposalController],
  providers: [CommercialProposalService],
})
export class CommercialProposalModule {}
