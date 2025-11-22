export const CONFIG = {
  API_GATEWAY: "/api/v1",
  IDENTITY_SERVICE: "/identity",
};

export const API = {
  // ==========================
  // Identity Service - Authentication
  // ==========================
  LOGIN: "/identity/auth/token",
  REGISTER: "/identity/auth/registration",
  VERIFY_USER: "/identity/auth/verify-user",
  RESEND_OTP: "/identity/auth/resend-verification",
  FORGOT_PASSWORD: "/identity/auth/forgot-password",
  RESET_PASSWORD: "/identity/auth/reset-password",
  GOOGLE_LOGIN: "/oauth2/authorization/google",

  // ==========================
  // Profile Service
  // ==========================
  MY_INFO: "/profile/users/my-profile",
  UPDATE_PROFILE: "/profile/users/my-profile",
  UPDATE_AVATAR: "/profile/users/avatar",
  UPDATE_BACKGROUND: "/profile/users/background",
  SEARCH_USER: "/profile/users/search",

  // ==========================
  // Post Service
  // ==========================
  MY_POST: "/post/my-posts",
  CREATE_POST: "/post/create",

  // ==========================
  // Chat Service
  // ==========================
  MY_CONVERSATIONS: "/chat/conversations/my-conversations",
  CREATE_CONVERSATION: "/chat/conversations/create",
  CREATE_MESSAGE: "/chat/messages/create",
  GET_CONVERSATION_MESSAGES: "/chat/messages",
};