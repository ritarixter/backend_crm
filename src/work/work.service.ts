import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities/work.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private workRepository: Repository<Work>,
  ) {}

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workRepository.save(createWorkDto);
  }

  findBy(query: FindOptionsWhere<Work> | FindOptionsWhere<Work>[]) {
    return this.workRepository.findBy(query);
  }

  async findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  async findOne(query: FindOneOptions<Work>): Promise<Work> {
    return this.workRepository.findOne(query);
  }

  find(query: FindManyOptions<Work>) {
    return this.workRepository.find(query);
  }

  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const work = await this.findOne({
      where: { id },
    });
    if (updateWorkDto.name) work.name = updateWorkDto.name;
    return this.workRepository.save(work);
  }

  async remove(id: number) {
    const work = this.findOne({ where: { id } });
    if (!work) throw new NotFoundException('Такой работы не существует!');
    return await this.workRepository.delete(id);
  }
}
