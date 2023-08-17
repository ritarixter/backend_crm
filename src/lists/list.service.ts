import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/users/users.service';
import { WorkService } from 'src/work/work.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly worksService: WorkService,
  ) {}

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.findOne({
      where: { id },
      relations: {
        users:true
      }
    });
    if (updateListDto.name) list.name = updateListDto.name;
    if (updateListDto.description) list.description = updateListDto.description;
    if (updateListDto.endDate) list.endDate = updateListDto.endDate;
    if (updateListDto.customer) list.customer = updateListDto.customer;
    if (updateListDto.importance) list.importance = updateListDto.importance;
    if (updateListDto.status) list.status = updateListDto.status;
    if (updateListDto.files) list.files = updateListDto.files;
    if (updateListDto.idCompany) {
      const company = await this.companyService.findOne({
        where: { id: updateListDto.idCompany },
      });
      if (!company) {
        throw new NotFoundException('Компания не найдена');
      } else {
        list.company = company;
      }
    }
    if (updateListDto.commercialProposal) {
      list.commercialProposal = updateListDto.commercialProposal;
    }
    if (updateListDto.users) {
      const users = await this.userService.findBy({
        id: In(updateListDto.users),
      });
      if (users) {
    /*     users.forEach((user)=>{
          list.users.push(user)
        }) */
        list.users = list.users.concat(users)
      }
    }
    if (updateListDto.works) {
      const works = await this.worksService.findBy({
        id: In(updateListDto.works),
      });
      if (works) {
        list.works = works;
      }
    }
    return this.listRepository.save(list);
  }

  async findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  async findOne(query: FindOneOptions<List>) {
    return this.listRepository.findOne(query);
  }

  find(query: FindManyOptions<List>) {
    return this.listRepository.find(query);
  }

  async create(createListDto: CreateListDto, access: string): Promise<List> {
    if (access != 'Менеджер') {
      throw new ForbiddenException('Вы не можете удалять заявки');
    } else {
      const company = await this.companyService.findOne({
        where: { INN: createListDto.INNCompany },
      });
      if (!company) {
        throw new NotFoundException('Компания не найдена');
      }
      return this.listRepository.save({
        ...createListDto,
        company: { id: company.id },
      });
    }
  }

  remove(id: number, access: string) {
    if (access != 'Менеджер') {
      throw new ForbiddenException('Вы не можете удалять заявки');
    }
    return this.listRepository.delete(id);
  }
}
