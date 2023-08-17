import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { WorkService } from 'src/work/work.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    private readonly workService: WorkService,
    private readonly userService: UserService,
  ) {}

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOne({
      where: { id },
    });
    if (updatePlanDto.title) plan.title = updatePlanDto.title;
    if (updatePlanDto.description) plan.description = updatePlanDto.description;
    if (updatePlanDto.usersId) {
      const users = await this.userService.findBy({
        id: In(updatePlanDto.usersId),
      });
      if (users) {
        plan.users = users;
      }
    }
    if (updatePlanDto.worksId) {
      const works = await this.workService.findBy({
        id: In(updatePlanDto.worksId),
      });
      if (works) {
        plan.works = works;
      }
    }
    return this.planRepository.save(plan);
  }

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    let users = [];
    if (createPlanDto.usersId) {
      const usersCurrent = await this.userService.findBy({
        id: In(createPlanDto.usersId),
      });
      if (usersCurrent) {
        users = usersCurrent;
      }
    }
    let works = [];
    if (createPlanDto.worksId) {
      const worksCurrent = await this.workService.findBy({
        id: In(createPlanDto.worksId),
      });
      if (worksCurrent) {
        works = worksCurrent;
      }
    }

    const plan = this.planRepository.save({
      ...createPlanDto,
      works: works,
      users: users,
    });
    return plan;
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }
  async findOne(query: FindOneOptions<Plan>) {
    return this.planRepository.findOne(query);
  }

  async find(query: FindManyOptions<Plan>) {
    return this.planRepository.find(query);
  }

  remove(id: number) {
    return this.planRepository.delete(id);
  }
}
