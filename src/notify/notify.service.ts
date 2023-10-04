import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { Notify } from './entities/notify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { UserService } from 'src/users/users.service';
import { ListService } from 'src/lists/list.service';
import { UpdateNotifyDto } from './dto/update-notify.dto';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify) private notifyRepository: Repository<Notify>,
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  async create(createNotifyDto: CreateNotifyDto): Promise<Notify> {
    const list = this.listService.findOne({
      where: { id: createNotifyDto.listId },
    });

    const users = await this.userService.findBy({
      id: In(createNotifyDto.usersId),
    });

    if (!list) {
      throw new NotFoundException('Заявка не найдена');
    }
    if (!users) {
      throw new NotFoundException('Пользователи не найден');
    }

    return this.notifyRepository.save({
      ...createNotifyDto,
      list: { id: createNotifyDto.listId },
      users: users,
    });
  }

  findAll() {
    return `This action returns all notify`;
  }

  async findOne(query: FindOneOptions<Notify>) {
    return this.notifyRepository.findOne(query);
  }

  remove(id: number) {
    return `This action removes a #${id} notify`;
  }

  find(query: FindManyOptions<Notify>) {
    return this.notifyRepository.find(query);
  }

  async update(id: number, updateNotifytDto: UpdateNotifyDto) {
    const notify = await this.notifyRepository.findOne({
      where: { id },
    });
    if (updateNotifytDto.isWatched)
      notify.isWatched = updateNotifytDto.isWatched;
    return this.notifyRepository.save(notify);
  }
}
