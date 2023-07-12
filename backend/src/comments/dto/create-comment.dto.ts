import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  mealId: number;

  @IsNotEmpty()
  comment: string;
}
