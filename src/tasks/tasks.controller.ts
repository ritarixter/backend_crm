import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Between } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: {user: User}) {
    createTaskDto.user = req.user;
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findTasks(@Req() req: {user: User}) {
    const tasks = await this.tasksService.find({
      where: { user: { id: req.user.id } },
    });
    if (!tasks) {
      throw new NotFoundException();
    }
    return tasks;
  }

  @UseGuards(JwtGuard)
  @Post('byDate')
    async getTasksByDate(@Req() req: {user: User}, @Body() { endDate } : { endDate: Date }) {
      let startDate = new Date(endDate);
      let lastDate = new Date(endDate);
      lastDate.setUTCHours(24);
      const tasks = await this.tasksService.find({
        where: {
          user: { id: req.user.id },
          endDate: Between(startDate, lastDate)
        },
      });
    if (!tasks) {
        throw new NotFoundException();
      }
      return tasks;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: {user: User}) {
    return this.tasksService.update(+id, updateTaskDto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: {user: User}) {
    return this.tasksService.remove(+id, req.user.id);
  }
}
