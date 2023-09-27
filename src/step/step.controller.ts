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
import { StepService } from './step.service';
import { Step } from './entities/step.entity';
import { UpdateStepDto } from './dto/update-step.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('step')
export class StepController {
  constructor(private stepService: StepService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Step[]> {
    return this.stepService.find({
      select: {
        list: {
          id: true,
        },
      },
      relations: {
        list: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  @UseGuards(JwtGuard)
  @Post()
  create(): Promise<Step> {
    return this.stepService.create();
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListDto: UpdateStepDto) {
    return this.stepService.update(id, updateListDto);
  }
}
