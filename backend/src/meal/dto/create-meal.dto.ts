import { IsNotEmpty } from 'class-validator';
import { MealType } from '../entities/meal.entity';

export class CreateMealDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  mealType: MealType;

  @IsNotEmpty()
  calories: number;

  @IsNotEmpty()
  mealName: string;

  @IsNotEmpty()
  mealDescription: string;

  @IsNotEmpty()
  carbohydrates: number;

  @IsNotEmpty()
  proteins: number;

  @IsNotEmpty()
  sugars: number;

  @IsNotEmpty()
  fats: number;
}
