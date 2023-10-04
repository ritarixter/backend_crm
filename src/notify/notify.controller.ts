import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdateNotifyDto } from './dto/update-notify.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  create(@Body() createNotifyDto: CreateNotifyDto) {
    return this.notifyService.create(createNotifyDto);
  }

  // @Get()
  // findAll() {
  //   return this.notifyService.findAll();
  // }

  //   @Get(':id')
  //   findOne(@Param('id') userId: string,) {
  //     return this.notifyService.find({
  // where: {users: userId}
  //     });
  //   }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notifyService.remove(+id);
  // }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNotifyDto: UpdateNotifyDto) {
    return this.notifyService.update(id, updateNotifyDto);
  }
}
