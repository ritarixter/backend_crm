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
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: { user: User }): Promise<List[]> {
    if (req.user.access === 'Инженер') {
      return this.listService.find({
        where: { users: { id: req.user.id } },
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
          works: true,
          step: true,
        },
        order: {
          createdAt: 'DESC',
          //endDate: "ASC"
        },
      });
    } else if (req.user.access === 'Менеджер') {
      return this.listService.find({
        select: {
          id: true,
          name: true,
          description: true,
          customer: true,
          files: true,

          createdAt: true,
          company: {
            id: true,
            INN: true,
            email: true,
            name: true,
            nameCompany: true,
            numberPhone: true,
          },
        },
        relations: {
          company: true,
          step: true,
        },
        order: {
          createdAt: 'DESC',
          //endDate: "ASC"
        },
      });
    } else {
      return this.listService.find({
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
          works: true,
          step: true,
        },
        order: {
          createdAt: 'DESC',
          //endDate: "ASC"
        },
      });
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: { user: User }) {
    if (req.user.access === 'Менеджер') {
      return this.listService.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          customer: true,
          files: true,
          address: true,
          company: {
            id: true,
            INN: true,
            email: true,
            name: true,
            nameCompany: true,
            numberPhone: true,
          },
        },
        relations: {
          company: true,
          step: true,
        },
      });
    } else {
      return this.listService.findOne({
        where: { id },
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
          step: true,
        },
      });
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id/commercial-proposal')
  findOneCommercialProposal(@Param('id') id: number) {
    return this.listService.findOne({
      where: { id },
      select: {
        id: true,
      },
      relations: {
        commercialProposal: true,
      },
    });
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @Req() req: { user: User },
  ) {
    return this.listService.create(createListDto, req.user.access);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: User }) {
    return this.listService.remove(+id, req.user.access);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/upload')
  removeFile(
    @Param('id') id: string,
    @Body() deleteFileDto: DeleteFileDto,
    @Req() req: { user: User },
  ) {
    return this.listService.removeFile(
      +id,
      deleteFileDto.filePath,
      req.user.access,
      deleteFileDto.access,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }
}
