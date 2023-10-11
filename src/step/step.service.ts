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
      step.photoSurvey_step3 = true;
    }

    if (updateStepDto.idStep === 4) {
      step.checkingPhotoSurvey_step4 = true;
    }

    if (updateStepDto.idStep === 5) {
      step.createCP_step5 = true;
    }
    if (updateStepDto.idStep === 6) {
      step.updateCP_step6 = true;
    }
    if (updateStepDto.idStep === 7) {
      step.checkingCP_step7 = true;
    }
    if (updateStepDto.idStep === 7.1) {
      step.sendToBuyer_step7_1 = true;
      step.updateCP_step6 = false;
    }
    if (updateStepDto.idStep === 8) {
      step.calcMarginality_step8 = true;
    }
    if (updateStepDto.idStep === 8.1) {
      step.returnCPforSuperEngineer_step8_1 = true;
      step.checkingCP_step7 = false;
    }
    if (updateStepDto.idStep === 9) {
      step.approvalCP_step9 = true;
    }
    if (updateStepDto.idStep === 10) {
      step.agreementСonclusion_step10 = true;
    }
    if (updateStepDto.idStep === 11) {
      step.editCPbyBuyer_step11 = true;
    }
    if (updateStepDto.idStep === 12) {
      step.setsDeadline_step12 = true;
    }
    if (updateStepDto.idStep === 13) {
      step.plannerUploadsFiles_step13 = true;
    }
    if (updateStepDto.idStep === 14) {
      step.workFitter_step14 = true;
    }
    if (updateStepDto.idStep === 15) {
      step.checkWorkFitter_step15 = true;
    }
    if (updateStepDto.idStep === 16) {
      step.WorkCertificate_step16 = true;
    }
    if (updateStepDto.idStep === 17) {
      step.SignTheAct_step17 = true;
    }
    if (updateStepDto.idStep === 18) {
      step.LawyerBill_step18 = true;
    }
    if (updateStepDto.idStep === 19) {
      step.closeList_step19 = true;
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
