import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

export const getFriendRequests = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.RECEIVED_REQUESTS}?page=${page}&size=${size}`);
};

export const getFriendSuggestions = async (page = 1, size = 20) => {
  return apiFetch(API_ENDPOINTS.FRIEND.SUGGESTIONS);
};

export const getAllFriends = async (page = 1, size = 20) => {
  return apiFetch(`${API_ENDPOINTS.FRIEND.LIST_FRIENDS}?page=${page}&size=${size}`);
};

export const acceptFriendRequest = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.ACCEPT_REQUEST.replace(':id', friendId), {
    method: 'POST',
  });
};

export const declineFriendRequest = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.REJECT_REQUEST.replace(':id', friendId), {
    method: 'POST',
  });
};

export const addFriend = async (userId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.SEND_REQUEST.replace(':id', userId), {
    method: 'POST',
  });
};

export const removeFriend = async (friendId) => {
  return apiFetch(API_ENDPOINTS.FRIEND.REMOVE_FRIEND.replace(':id', friendId), {
    method: 'DELETE',
  });
};

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
