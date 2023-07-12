import { IsNotEmpty } from "class-validator";
import { Meal } from "src/meal/entities/meal.entity";
import { User } from "src/user/entities/user.entity";

export class CreateLikeDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  mealId: number;
}
