import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Step } from './entities/step.entity';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step) private stepRepository: Repository<Step>,
  ) {}

  find(query: FindManyOptions<Step>) {
    return this.stepRepository.find(query);
  }

  async update(id: number, updateStepDto: UpdateStepDto) {
    const step = await this.findOne({
      where: { id },
    });
    if (updateStepDto.idStep === 1) {
      step.createList_step1 = true;
    }
    if (updateStepDto.idStep === 2) {
      step.chooseEngineer_step2 = true;
    }
    if (updateStepDto.idStep === 3) {
      step.createCP_step3 = true;
    }

    if (updateStepDto.idStep === 3.1) {
      step.ChooseFitter_step3_1 = true;
    }

    if (updateStepDto.idStep === 4) {
      step.editCPbyBuyer_step4 = true;
    }
    if (updateStepDto.idStep === 5) {
      step.checkCPbySuperEngineer_step5 = true;
      step.returnToBuyer_step5_1 = false;
    }
    if (updateStepDto.idStep === 5.1) {
      step.returnToBuyer_step5_1 = true;
      step.editCPbyBuyer_step4 = false;
      step.checkCPbySuperEngineer_step5 = false;
    }
    if (updateStepDto.idStep === 6) {
      step.calcMarginality_step6 = true;
      step.returnCPforSuperEngineer_step7 = false;
    }
    if (updateStepDto.idStep === 7) {
      step.checkCPbySuperEngineer_step5 = false;
      step.calcMarginality_step6 = false;
      step.returnCPforSuperEngineer_step7 = true;
    }
    if (updateStepDto.idStep === 8) {
      step.agreementСonclusion_step8 = true;
    }
    if (updateStepDto.idStep === 9) {
      step.workFitter_step9 = true;
    }
    if (updateStepDto.idStep === 10) {
      step.closeList_step10 = true;
    }
    return this.stepRepository.save(step);
  }

  async create() {
    return this.stepRepository.save({});
  }

  async findOne(query: FindOneOptions<Step>) {
    return this.stepRepository.findOne(query);
  }

  async remove(id: number) {
    return this.stepRepository.delete(id);
  }
}

