import httpClient from "./httpClient";
import localStorageService from "./localStorageService";

export const logIn = async (credentials) => {
  const response = await httpClient.post("/auth/sign-in", credentials);
  if (response.data.result.accessToken) {
    localStorageService.setToken(response.data.result.accessToken);
  }
  return response;
};

export const registerAccount = async (userData) => {
  return await httpClient.post("/auth/sign-up", userData);
};

export const requestPasswordReset = async (email) => {
  return await httpClient.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return await httpClient.post(`/auth/reset-password`, {
    token,
    newPassword,
  });
};

export const verifyUser = async (verificationData) => {
  return await httpClient.post("/auth/verify-user", verificationData);
};

export const resendVerification = async (email) => {
  return await httpClient.post("/auth/resend-verification", { email });
};

export const logOut = () => {
  localStorageService.removeToken();
};

export const isAuthenticated = () => {
  return !!localStorageService.getToken();
};

export const getToken = () => {
  return localStorageService.getToken();
};
