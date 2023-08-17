import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find({
      relations: {
        lists: true,
      },
    });
  }

  find(query: FindManyOptions<Company>) {
    return this.companyRepository.find(query);
  }

  findOne(query: FindOneOptions<Company>) {
    return this.companyRepository.findOne(query);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, access: string) {
    if (access === 'Менеджер') {
      const company = await this.findOne({
        where: { id },
      });
      if (company) {
        return this.companyRepository.save({...company, ...updateCompanyDto });
      } else {
        return new NotFoundException('Компания не найдена!');
      }
    } else {
      return new ForbiddenException('У вас недостаточно прав!');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
