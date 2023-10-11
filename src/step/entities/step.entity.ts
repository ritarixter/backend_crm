import { List } from 'src/lists/entities/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  createList_step1: boolean; //1.	Создание заявки

  @Column({ default: false })
  chooseEngineer_step2: boolean; //2. Выбор инженера и дедлайна на обследование c проектировщиком

  @Column({ default: false })
  photoSurvey_step3: boolean; //3.	Инженер после обследования прикрепляет фото

  @Column({ default: false })
  checkingPhotoSurvey_step4: boolean; //4.	Главный инженер проверяет фото с обследование и назначает дедлайн на кп

  @Column({ default: false })
  createCP_step5: boolean; //5. Создание КП

  @Column({ default: false })
  updateCP_step6: boolean; //6.	Закупщик заполняет цены закупки/продажи в КП, даты потом

  @Column({ default: false })
  checkingCP_step7: boolean; //7.	Проверка КП Главным инженером

  @Column({ default: false })
  sendToBuyer_step7_1: boolean; //7.	Отправить на доработку закупщику возврат к 6

// Если хорошо, то степ8 иначе степ 7.1
//Аксинья считает маржинальность
  @Column({ default: false })
  calcMarginality_step8: boolean; //Хорошая маржинальность то дальше

  @Column({ default: false })
  returnCPforSuperEngineer_step8_1: boolean; //Плохая маржинальность то обратно 7

  @Column({ default: false })
  approvalCP_step9: boolean; //9.	Главный инженер проверяет КП

  //Маржинальность хорошая, утверждение КП и отправка Юристам
  @Column({ default: false })
  agreementСonclusion_step10: boolean; //10. Подписание договора юристами и выставление дедлайна

  @Column({ default: false })
  editCPbyBuyer_step11: boolean; //11. проставление  даты (даты доставки на склад/объект) закупщиком

  @Column({ default: false })
  setsDeadline_step12: boolean; //12.	Главный инженер проставляет дедлайн для инженера и монтажников

  @Column({ default: false })
  plannerUploadsFiles_step13: boolean; // 13.	Проектировщик загружает файлы проекта

  //Работа монтажников
  @Column({ default: false })
  workFitter_step14: boolean; //14. Инженер прикрепляет фото монтажных работ

  @Column({ default: false })
  checkWorkFitter_step15: boolean; //15. Проверка фото монтажных работ Главным инженером и отправка юристам

  @Column({ default: false })
  WorkCertificate_step16: boolean; //16. Юристы прикрепляют акт работ

  @Column({ default: false })
  SignTheAct_step17: boolean; //17. Главный инженер подписывает акт

  //Юристы выставляют счет
  @Column({ default: false })
  LawyerBill_step18: boolean; //Юристы закончили свою работу

  //Когда счет оплачен Зам директора считает итоговую маржу и закрывает заявку
  @Column({ default: false })
  closeList_step19: boolean; //Закрытие заявки

  // @Column({ default: false })
  // returnToBuyer_step5_1: boolean; //Возврат кп Главным инженером закупщику

  // @Column({ default: false })
  // calcMarginality_step6: boolean; //Аксинья считает маржинальность и выгоду

  // //Если маржинальность отрицательная, то отправляется обратно главному инженеру на изменение/исправление, далее опять шаг 6
  // @Column({ default: false })
  // returnCPforSuperEngineer_step7: boolean; //необязательно

  // //Маржинальность хорошая, утверждение КП и отправка Юристам
  // @Column({ default: false })
  // agreementСonclusion_step8: boolean; //Подписание договора юристами и выставление дедлайна

  // //Работа монтажников
  // @Column({ default: false })
  // workFitter_step9: boolean; //Инженер прикрепляет фото монтажных работ

  // //Юристы прикрепляют акт работ
  // @Column({ default: false })
  // WorkCertificate_step10: boolean; //Главный инженер должен его подписать

  // //Главный инженер подписывает акт
  // @Column({ default: false })
  // SignTheAct_step10_1: boolean;

  // //Юристы выставляют счет
  // @Column({ default: false })
  // LawyerBill_step11: boolean; //Юристы закончили свою работу

  // //Когда счет оплачен Зам директора считает итоговую маржу и закрывает заявку
  // @Column({ default: false })
  // closeList_step12: boolean; //Закрытие заявки

  @OneToOne(() => List, (list) => list.step)
  list: List;
}
