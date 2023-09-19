import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { StepController } from './step.controller';
import { StepService } from './step.service';


@Module({
  imports: [TypeOrmModule.forFeature([Step])],
  providers: [StepService],
  controllers: [StepController],
  exports: [StepService]
})
export class StepModule {}
