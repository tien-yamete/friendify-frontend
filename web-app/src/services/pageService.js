import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get all pages
 * @returns {Promise<{data: any, status: number}>}
 */
export const getPages = async () => {
  return apiFetch(API_ENDPOINTS.PAGE.LIST);
};

/**
 * Get suggested pages for current user
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSuggestedPages = async () => {
  return apiFetch(API_ENDPOINTS.PAGE.SUGGESTED);
};

/**
 * Follow a page
 * @param {string} pageId - Page ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const followPage = async (pageId) => {
  return apiFetch(API_ENDPOINTS.PAGE.FOLLOW.replace(':id', pageId), {
    method: 'POST',
  });
};

/**
 * Unfollow a page
 * @param {string} pageId - Page ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const unfollowPage = async (pageId) => {
  return apiFetch(API_ENDPOINTS.PAGE.UNFOLLOW.replace(':id', pageId), {
    method: 'POST',
  });
};
