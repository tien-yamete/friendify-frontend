import { getToken, removeToken, setToken } from "./localStorageService";
import { API_ENDPOINTS, CONFIG } from "../config/apiConfig";
import { apiFetch } from "./apiHelper";

/**
 * Login with username and password
 * @param {string} username - Username or email
 * @param {string} password - Password
 * @returns {Promise<{data: any, status: number}>}
 */
export const logIn = async (username, password) => {
  try {
    const response = await apiFetch(API_ENDPOINTS.IDENTITY.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
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

/**
 * Logout current user
 */
export const logOut = () => {
  removeToken();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Register a new account
 * @param {Object} userData - User registration data { username, email, password, firstName, lastName }
 * @returns {Promise<{data: any, status: number}>}
 */
export const registerAccount = async ({ username, email, password, firstName, lastName}) => {
  return apiFetch(API_ENDPOINTS.IDENTITY.REGISTER, {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName,
    }),
  });
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<{data: any, status: number}>}
 */
export const requestPasswordReset = async (email) => {
  return apiFetch(API_ENDPOINTS.IDENTITY.FORGOT_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Reset password with OTP code
 * @param {Object} resetData - Reset data { email, otpCode, newPassword }
 * @returns {Promise<{data: any, status: number}>}
 */
export const resetPassword = async ({ email, otpCode, newPassword }) => {
  return apiFetch(API_ENDPOINTS.IDENTITY.RESET_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ email, otpCode, newPassword }),
  });
};

/**
 * Resend verification OTP
 * @param {string} email - User email
 * @returns {Promise<{data: any, status: number}>}
 */
export const resendVerification = async (email) => {
  return apiFetch(API_ENDPOINTS.IDENTITY.RESEND_OTP, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Verify user account with OTP code
 * @param {Object} verifyData - Verification data { email, otpCode }
 * @returns {Promise<{data: any, status: number}>}
 */
export const verifyUser = async ({ email, otpCode }) => {
  return apiFetch(API_ENDPOINTS.IDENTITY.VERIFY_USER, {
    method: 'POST',
    body: JSON.stringify({ email, otpCode }),
  });
};

/**
 * Login with Google OAuth
 */
export const loginWithGoogle = () => {
  // Use relative path to go through Vite proxy -> Gateway
  const googleLoginUrl = `${CONFIG.API_GATEWAY}/identity/oauth2/authorization/google`;
  
  window.location.href = googleLoginUrl;
};