import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotifyDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  usersId: number[]; //кому уведомление

  @IsNotEmpty()
  @IsString()
  message: string;
}
