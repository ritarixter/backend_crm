import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //Получение данных об пользователе, который щас авторизован
  @UseGuards(JwtGuard)
  @Get('me')
  async findUser(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Get(':access')
  async findAccess(@Param('access') access: string): Promise<User[]> {
    return this.userService.find({
      where: { access },
    });
  }

   @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({
      where: { id }
    });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.userService.remove(id);
  // } 
}
