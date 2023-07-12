import apiClient from "../apiClient";
import { MealResponse, AddMealResponse, Meal } from "../types";

export const findFoodInfo = async (
  barcode: string
): Promise<MealResponse | any> => {
  try {
    const response = await apiClient.get<MealResponse>(
      "http://localhost:8000/api/food/" + barcode
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMeal = async (
  meal: AddMealResponse
): Promise<AddMealResponse | any> => {
  console.log(meal);
  // 👇️ const response: Response
  const response = await apiClient
    .post("http://127.0.0.1:8000/api/meal", meal)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAllMeals = async (): Promise<Meal[] | any> => {
  try {
    const response = await apiClient.get<Meal>(
      "http://localhost:8000/api/meal"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
