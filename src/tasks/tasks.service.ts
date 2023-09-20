import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, Between } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  find(query: FindManyOptions<Task>) {
    return this.taskRepository.find(query);
  }

  async findOne(query: FindOneOptions<Task>) {
    return this.taskRepository.findOne(query);
  }

  // async findByDate(date: Date): Promise<Task> {
  //   let startDate = new Date(date);
  //   let lastDate = new Date(date);
  //   lastDate.setUTCHours(24);
  //   console.log(lastDate);
  //   const task = await this.taskRepository.find({

  //     where: { endDate:  Between( startDate, lastDate ) }

  //   })
  //   console.log(task);
  //   return task[0];
  // };

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.findOne({
      relations: {
        user: true,
      },
      where: { id },
    });

    if (task.user.id != userId) {
      throw new ForbiddenException('Вы не можете изменять чужие задачи!');
    }
    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne({
      relations: {
        user: true,
      },
      where: { id },
    });

    if (task.user.id != userId) {
      throw new ForbiddenException('Вы не можете удалять чужие задачи!');
    }

    if (!task) throw new NotFoundException('Такой задачи не существует!');

    return await this.taskRepository.delete(id);
  }
}
