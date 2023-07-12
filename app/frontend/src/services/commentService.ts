import apiClient from "@/apiClient";
import { CommentAmount, Comment, PostCommentBody } from "@/types";

export const getCommentAmountPerMeal = async (): Promise<
  CommentAmount[] | any
> => {
  try {
    const response = await apiClient.get<CommentAmount[]>(
      "http://localhost:8000/api/comments/count/all"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsForMeal = async (mealId: number): Promise<Comment | any> => {
  try {
    const response = await apiClient.get<Comment>(
      "http://localhost:8000/api/comments/meal/" + mealId
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (
  commentBody: PostCommentBody
): Promise<Comment | any> => {
  console.log(commentBody);
  // 👇️ const response: Response
  return await apiClient
    .post("http://127.0.0.1:8000/api/comments", commentBody)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
