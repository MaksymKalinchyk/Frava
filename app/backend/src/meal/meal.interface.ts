import { MealItem } from "src/meal-item/entities/meal-item.entity";
import { Meal } from "./entities/meal.entity";

export interface FullMeal {
    Meal: Meal,
    MealItems: MealItem[]
}