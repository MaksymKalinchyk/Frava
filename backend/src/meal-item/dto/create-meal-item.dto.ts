import { IsNotEmpty } from "class-validator";

export class CreateMealItemDto {
  @IsNotEmpty()
  calories: number;

  @IsNotEmpty()
  mealItemName: string;

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
