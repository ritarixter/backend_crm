import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  listId:number;

  @IsNotEmpty()
  userId: number; //владелец комментария

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  comment: string;
}
