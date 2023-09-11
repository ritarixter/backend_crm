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

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: { user: User }): Promise<List[]> {
    if (req.user.access === 'Главный инженер' || req.user.access === 'Закупщик' || req.user.access === 'Зам директора') {
      return this.listService.find({
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
          works: true,
        },
        order: {
          createdAt: 'DESC',
          //endDate: "ASC"
        },
      });
    } else if (req.user.access === 'Менеджер') {
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ХЗ
      return this.listService.find({
        select: {
          id: true,
          name: true,
          description: true,
          customer: true,
          files: true,
 
          createdAt:true,
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
        },
        order: {
          createdAt: 'ASC',
          //endDate: "ASC"
        },
      });
    } else {
      return this.listService.find({
        where: { users: { id: req.user.id } },
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
          works: true,
        },
        order: {
          createdAt: 'ASC',
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
        },
      });
    }

    if (req.user.access === 'Главный инженер') {
      return this.listService.findOne({
        where: { id },
        relations: {
          company: true,
          commercialProposal: true,
          users: true,
        },
      });
    }

    if (req.user.access === 'Инженер' || req.user.access === 'Закупщик' || req.user.access === 'Зам директора' || req.user.access === 'Юрист') {
      return this.listService.findOne({
        where: { id },
        relations: {
          company: true,
          commercialProposal: true,
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
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }
}
