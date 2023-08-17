import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkModule } from 'src/work/work.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), WorkModule, UsersModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
