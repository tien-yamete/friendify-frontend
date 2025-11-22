export const KEY_TOKEN = "accessToken";

export const TOKEN_CHANGED_EVENT = 'tokenChanged';

export const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
  window.dispatchEvent(new CustomEvent(TOKEN_CHANGED_EVENT, { detail: { token } }));
};

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(KEY_TOKEN);
  window.dispatchEvent(new CustomEvent(TOKEN_CHANGED_EVENT, { detail: { token: null } }));
};
