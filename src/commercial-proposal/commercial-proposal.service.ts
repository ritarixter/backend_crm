import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommercialProposalDto } from './dto/create-commercial-proposal.dto';
import { UpdateCommercialProposalDto } from './dto/update-commercial-proposal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CommercialProposal } from './entities/commercial-proposal.entity';
import { CompanyService } from 'src/company/company.service';
import { ListService } from 'src/lists/list.service';

@Injectable()
export class CommercialProposalService {
  constructor(
    @InjectRepository(CommercialProposal)
    private commercialProposalRepository: Repository<CommercialProposal>,
    private readonly listService: ListService,
  ) {}

  async findAll(): Promise<CommercialProposal[]> {
    return this.commercialProposalRepository.find();
  }

  async find(query: FindManyOptions<CommercialProposal>) {
    return this.commercialProposalRepository.find(query);
  }

  async create(
    createCommercialProposalDto: CreateCommercialProposalDto,
  ): Promise<CommercialProposal> {
    const list = this.listService.findOne({
      where: { id: createCommercialProposalDto.idList },
    });
    if (!list) {
      throw new NotFoundException('Заявка не найдена');
    }
    return this.commercialProposalRepository.save({
      ...createCommercialProposalDto,
      list: { id: createCommercialProposalDto.idList },
    });
  }

  findOne(id: number) {
    return this.commercialProposalRepository.find({
      where: { id },
      relations: {
        list: true,
      },
    });
  }

  async update(
    id: number,
    updateCommercialProposalDto: UpdateCommercialProposalDto,
  ) {
    const commercialProposal = await this.findOne(id);
    if (commercialProposal) {
      return this.commercialProposalRepository.save({
        ...commercialProposal,
        ...updateCommercialProposalDto,
      });
    } else {
      return new NotFoundException('КП не найдено!');
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} commercialProposal`;
  // }
}
