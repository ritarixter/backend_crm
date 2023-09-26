import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  createList_step1: boolean;

  @Column({ default: false })
  chooseEngineer_step2: boolean; //Выбор инженера и обследование c проектировщиком

  @Column({ default: false })
  createCP_step3: boolean; //Создание КП

  @Column({ default: false })
  ChooseFitter_step3_1: boolean; //выбор монтажников

  @Column({ default: false })
  editCPbyBuyer_step4: boolean; //проставление цен закупщиком

  @Column({ default: false })
  checkCPbySuperEngineer_step5: boolean; //Проверка кп Главным инженером и отправка Аксиньи

  @Column({ default: false })
  returnToBuyer_step5_1: boolean; //Возврат кп Главным инженером закупщику

  @Column({ default: false })
  calcMarginality_step6: boolean; //Аксинья считает маржинальность и выгоду

  //Если маржинальность отрицательная, то отправляется обратно главному инженеру на изменение/исправление, далее опять шаг 6
  @Column({ default: false })
  returnCPforSuperEngineer_step7: boolean; //необязательно

  //Маржинальность хорошая, утверждение КП и отправка Юристам
  @Column({ default: false })
  agreementСonclusion_step8: boolean; //заключение и подписание договора

  //Работа монтажников
  @Column({ default: false })
  workFitter_step9: boolean; //Кто подтверждает, что работа монтажников закончилась? ЕДИНСТВЕННЫЙ НЕ СДЕЛАННЫЙ СТЕП!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //Когда монтажники закончили работу отправляется уведомление Аксиньи
  @Column({ default: false })
  closeList_step10: boolean; //Закрытие заявки

  @OneToOne(() => List, (list) => list.step)
  list: List;
}
