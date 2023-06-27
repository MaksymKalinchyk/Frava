import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
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

  @IsNotEmpty()
  servings: number;
}
