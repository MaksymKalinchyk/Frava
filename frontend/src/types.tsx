export type AuthResponse = {
  User: User;
  accessToken: string;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type MealResponse = {
  nutriments?: Nutriment;
  serving_size?: number;
  serving_unit?: string;
  product_name?: string;
  ecoscore_extended_data?: ecoscore_extended_data;
};

export type AddMealResponse = {
  userId: number;
  mealType: string;
  calories: number;
  mealName: string;
  mealDescription: string;
  carbohydrates: number;
  proteins: number;
  sugars: number;
  fats: number;
};

export type Meal = {
  mealType: string;
  mealName: string;
  mealDescription: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  sugars: number;
  fats: number;
  servings: number;
  created_at: Date;
  user: User;
};

export type Nutriment = {
  "energy-kcal_serving"?: number;
  fat_serving: number;
  carbohydrates_serving: number;
  proteins_serving: number;
  sugars_serving: number;
};

type ecoscore_extended_data = {
  impact: Impact;
};

type Impact = {
  warnings: [];
};

export type MealItems = {
  amount: number;
  product_name: string;
  meal: Nutriment;
};  
