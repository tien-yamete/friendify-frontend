import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get received friend requests with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getFriendRequests = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.RECEIVED_REQUESTS}?page=${page}&size=${size}`);
};

/**
 * Get friend suggestions
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getFriendSuggestions = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.SUGGESTIONS}?page=${page}&size=${size}`);
};

/**
 * Get all friends with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getAllFriends = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.LIST_FRIENDS}?page=${page}&size=${size}`);
};

/**
 * Accept a friend request
 * @param {string} friendId - Friend request ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const acceptFriendRequest = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.ACCEPT_REQUEST.replace(':id', friendId), {
    method: 'POST',
  });
};

/**
 * Decline/reject a friend request
 * @param {string} friendId - Friend request ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const declineFriendRequest = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.REJECT_REQUEST.replace(':id', friendId), {
    method: 'POST',
  });
};

/**
 * Send a friend request
 * @param {string} userId - User ID to send request to
 * @returns {Promise<{data: any, status: number}>}
 */
export const addFriend = async (userId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.SEND_REQUEST.replace(':id', userId), {
    method: 'POST',
  });
};

/**
 * Remove a friend
 * @param {string} friendId - Friend ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const removeFriend = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.REMOVE_FRIEND.replace(':id', friendId), {
    method: 'DELETE',
  });
};

/**
 * Get sent friend requests with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSentFriendRequests = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.SENT_REQUESTS}?page=${page}&size=${size}`);
};

/**
 * Search friends with friendship status
 * @param {string} keyword - Search keyword
 * @returns {Promise<{data: {result: ProfileResponse[]}, status: number}>}
 */
export const searchFriends = async (keyword) => {
  if (!keyword || keyword.trim().length === 0) {
    return { data: { result: [] }, status: 200 };
  }

  return apiFetch(`${API_ENDPOINTS.FRIEND.SEARCH}?keyword=${encodeURIComponent(keyword.trim())}`);
};
