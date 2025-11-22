import { getToken, removeToken, setToken } from "./localStorageService";
import httpClient from "../configurations/httpClient";
import { API, CONFIG } from "../configurations/configuration";

export const logIn = async (username, password) => {
  try {
    const response = await httpClient.post(API.LOGIN, {
      username: username,
      password: password,
    });

    const token = response.data?.result?.token || response.data?.token || response.data?.data?.token;
    if (token) {
      setToken(token);
    } else {
      console.warn("Không tìm thấy token thông báo nào trong phản hồi:", response.data);
    }

    return response;
  } catch (error) {
    console.error("Đăng nhập thất bại: ", error);
    throw error;
  }
};

export const logOut = () => {
  removeToken();
};

export const isAuthenticated = () => {
  return getToken();
};

export const registerAccount = async ({ username, email, password, firstName, lastName}) => {
  const response = await httpClient.post(API.REGISTER, {
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  return response;
};

export const requestPasswordReset = async (email) => {
  const response = await httpClient.post(API.FORGOT_PASSWORD, {
    email: email,
  });

  return response;
}

export const resetPassword = async ({ email, otpCode, newPassword }) => {
  const response = await httpClient.post(API.RESET_PASSWORD, {
    email: email,
    otpCode: otpCode,
    newPassword: newPassword,
  });

  return response;
}

export const resendVerification = async (email) => {
  const response = await httpClient.post(API.RESEND_OTP, {
    email: email,
  });

  return response;
}

export const verifyUser = async ({ email, otpCode }) => {
  const response = await httpClient.post(API.VERIFY_USER, {
    email: email,
    otpCode: otpCode,
  });
  return response;
}

export const loginWithGoogle = () => {
  const googleLoginUrl = `${CONFIG.API_GATEWAY}${CONFIG.IDENTITY_SERVICE}${API.GOOGLE_LOGIN}`;
  
  window.location.href = googleLoginUrl;
}