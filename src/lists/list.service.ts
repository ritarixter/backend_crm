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
import { StepService } from 'src/step/step.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly worksService: WorkService,
    private readonly stepService: StepService,
   // private readonly commentService: CommentService,
  ) {}

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
    if (updateListDto.name) list.name = updateListDto.name;
    if (updateListDto.endDate) list.endDate = updateListDto.endDate;
    if (updateListDto.customer) list.customer = updateListDto.customer;
    if (updateListDto.importance) list.importance = updateListDto.importance;
    if (updateListDto.status) list.status = updateListDto.status;
    if (updateListDto.address) list.address = updateListDto.address;
    if (updateListDto.files)
      list.files = list.files.concat(updateListDto.files);
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
        const engineer = users.filter((user) => user.access === 'Инженер');
        const fitters = users.filter((user) => user.access === 'Монтажник');

        if (engineer.length != 0) {
          if (list.users.some((user) => user.access === 'Инженер')) {
            const notEngineer = users.filter(
              (user) => user.access != 'Инженер',
            );
            list.users = notEngineer;
            list.users = list.users.concat(engineer);
          } else {
            list.users = engineer;
          }
        }
        if (fitters.length != 0) {
          list.users = list.users.concat(fitters);
        }
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
      throw new ForbiddenException('Вы не можете создавать заявки');
    } else {
      const company = await this.companyService.findOne({
        where: { INN: createListDto.INNCompany },
      });
      if (!company) {
        throw new NotFoundException('Компания не найдена');
      }
      const step = await this.stepService.create();
      return this.listRepository.save({
        ...createListDto,
        company: { id: company.id },
        step: step,
      });
    }
  }

  async remove(id: number, access: string) {
    if (access != 'Менеджер') {
      throw new ForbiddenException('Вы не можете удалять заявки');
    }

    // const comments = await this.commentService.find({
    //   where: { list: { id: id } },
    // });
    // if (comments) {
    //   comments.forEach((comment) => {
    //     this.commentService.remove(comment.id);
    //   });
    // }

    return this.listRepository.delete(id);
  }

  async removeFile(
    id: number,
    filePath: string,
    accessCurrentUser: string,
    accessFile: string,
  ) {
    if (accessCurrentUser != accessFile) {
      throw new ForbiddenException('Вы не можете удалять чужие файлы');
    }
    const list = await this.findOne({
      where: { id },
    });
    const withoutFile = list.files.filter(
      (file: { url: string }) => file.url != filePath,
    );

    return this.listRepository.save({ ...list, files: withoutFile });
  }
}
