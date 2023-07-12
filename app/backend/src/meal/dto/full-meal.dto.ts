import { IsNotEmpty } from 'class-validator';
import { CreateMealDto } from './create-meal.dto';
import { CreateMealItemDto } from 'src/meal-item/dto/create-meal-item.dto';

export class FullMealDto {
  @IsNotEmpty()
  Meal: CreateMealDto

  @IsNotEmpty()
  MealItems: CreateMealItemDto[]
}
