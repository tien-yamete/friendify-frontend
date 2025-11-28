/**
 * LocalStorage key for access token
 */
export const KEY_TOKEN = "accessToken";

/**
 * Custom event name for token changes
 */
export const TOKEN_CHANGED_EVENT = 'tokenChanged';

/**
 * Set access token in localStorage and dispatch change event
 * @param {string} token - Access token
 */
export const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
  window.dispatchEvent(new CustomEvent(TOKEN_CHANGED_EVENT, { detail: { token } }));
};

/**
 * Get access token from localStorage
 * @returns {string|null} Access token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

/**
 * Remove access token from localStorage and dispatch change event
 */
export const removeToken = () => {
  localStorage.removeItem(KEY_TOKEN);
  window.dispatchEvent(new CustomEvent(TOKEN_CHANGED_EVENT, { detail: { token: null } }));
};
