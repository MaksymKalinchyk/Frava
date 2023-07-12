import apiClient from "../apiClient";
import { FriendRequest } from "../types";

export const sendFriendRequest = async (
    userName: string
  ): Promise<FriendRequest | any> => {
    // 👇️ const response: Response
    return await apiClient
      .post("http://127.0.0.1:8000/api/friend-request/send/" + userName)
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  export const respondFriendRequest = async (
    friendRequestId: number | undefined, status: string
  ): Promise<FriendRequest | any> => {
    // 👇️ const response: Response
    const response = await apiClient
      .put("http://127.0.0.1:8000/api/friend-request/response/" + friendRequestId, {
        status
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  export const getFriendsList = async (): Promise<
    FriendRequest[] | any
  > => {
    try {
      const response = await apiClient.get<FriendRequest[]>(
        "http://localhost:8000/api/friend-request/friends-and-requests/"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };