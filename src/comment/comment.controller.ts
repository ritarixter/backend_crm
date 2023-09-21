import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  // @UseGuards(JwtGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne({
  //     where: { Number(id },
  //     relations: {
  //       list: true,
  //     },
  //   });
  // }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateCommentDto) {
    return this.commentService.update(id, updateProductDto);
  }


  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string, @Req() req: { user: User }) {
    return this.commentService.remove(+id, req.user.id);
  }
}
