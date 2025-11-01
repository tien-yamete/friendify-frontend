import httpClient from "./httpClient";

export const getMyInfo = async () => {
  return await httpClient.get("/users/me");
};

export const updateProfile = async (profileData) => {
  return await httpClient.put("/users/me", profileData);
};

export const uploadAvatar = async (formData) => {
  return await httpClient.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
