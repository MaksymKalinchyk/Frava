import apiClient from "../apiClient";
import { LikeBody, LikeResponse, LikesPerMeal } from "../types";

export const likeMeal = async (
  likeBody: LikeBody
): Promise<LikeResponse | any> => {
  console.log(likeBody);
  // 👇️ const response: Response
  return await apiClient
    .post("http://127.0.0.1:8000/api/likes", likeBody)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const removeLike = async (
  likeId: string | null
): Promise<LikeResponse | any> => {
  // 👇️ const response: Response
  const response = await apiClient
    .delete("http://127.0.0.1:8000/api/likes/" + likeId)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getTotalLikesPerMeal = async (
  mealId: number
): Promise<number | any> => {
  try {
    const response = await apiClient.get<number>(
      "http://localhost:8000/api/likes/" + mealId + "/total"
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const getTotalLikesForAllMeals = async (): Promise<
  LikesPerMeal[] | any
> => {
  try {
    const response = await apiClient.get<LikesPerMeal[]>(
      "http://localhost:8000/api/likes/total"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
