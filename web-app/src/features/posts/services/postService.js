import httpClient from "@/shared/services/httpClient";
import { API } from "@/shared/config/configuration";
import { getToken } from "@/shared/services/localStorageService";

export const getMyPosts = async (page) => {
  return await httpClient.get(API.MY_POST, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      page: page,
      size: 10,
    },
  });
};

export const createPost = async (content) => {
  return await httpClient.post(
    API.CREATE_POST,
    { content: content },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};
