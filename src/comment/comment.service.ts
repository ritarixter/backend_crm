import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CompanyService } from 'src/company/company.service';
import { ListService } from 'src/lists/list.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne({
      where: { id },
      relations: {
        list: true,
      },
    });
    if (comment) {
      return this.commentRepository.save({
        ...comment,
        ...updateCommentDto,
      });
    } else {
      return new NotFoundException('Комментарий не найден!');
    }
  }

  find(query: FindManyOptions<Comment>) {
    return this.commentRepository.find(query);
  }


  async findOne(query: FindOneOptions<Comment>) {
    return this.commentRepository.findOne(query);
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const list = this.listService.findOne({
      where: { id: createCommentDto.listId },
    });

    const user = this.userService.findOne({
      where: { id: createCommentDto.userId },
    });

    if (!list) {
      throw new NotFoundException('Заявка не найдена');
    }
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return this.commentRepository.save({
      ...createCommentDto,
      list: { id: createCommentDto.listId },
      user: { id: createCommentDto.userId },
    });
  }

  async remove(id: number) {
    // console.log(userId)
    // const comment = await this.findOne({

    //   where: { id },
    // });
    // console.log(comment)
    // if (comment.user.id != userId) {
    //   throw new ForbiddenException('Вы не можете удалять чужие комментарии!');
    // }

    // if (!comment)
    //   throw new NotFoundException('Такого комментария не существует!');

    return await this.commentRepository.delete(id);
  }
}
