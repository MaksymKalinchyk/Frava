import { IsNotEmpty } from "class-validator";
export class CreateMealItemDto {
  
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
  calories: number;

  @IsNotEmpty()
  servings: number;
}
