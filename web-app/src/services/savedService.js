import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get saved items with optional filters
 * @param {Object} filters - Filter parameters
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSavedItems = async (filters = {}) => {
  const queryParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null && v !== ''))
  );
  const endpoint = queryParams.toString() 
    ? `${API_ENDPOINTS.SAVED.ITEMS}?${queryParams}` 
    : API_ENDPOINTS.SAVED.ITEMS;
  return apiFetch(endpoint);
};

/**
 * Add a post to saved items
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const addSavedItem = async (postId) => {
  return apiFetch(API_ENDPOINTS.SAVED.ADD.replace(':id', postId), {
    method: 'POST',
  });
};

/**
 * Remove a saved item
 * @param {string} itemId - Saved item ID (post ID)
 * @returns {Promise<{data: any, status: number}>}
 */
export const removeSavedItem = async (itemId) => {
  return apiFetch(API_ENDPOINTS.SAVED.REMOVE.replace(':id', itemId), {
    method: 'DELETE',
  });
};
