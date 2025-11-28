import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get current user's posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getMyPosts = async (page = 1, size = 10) => {
  return apiFetch(`${API_ENDPOINTS.POST.MY_POSTS}?page=${page}&size=${size}`);
};

/**
 * Get public posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getPublicPosts = async (page = 1, size = 10) => {
  return apiFetch(`${API_ENDPOINTS.POST.PUBLIC_POSTS}?page=${page}&size=${size}`);
};

/**
 * Get post by ID
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const getPostById = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.GET_BY_ID.replace(':id', postId));
};

/**
 * Create a new post
 * @param {Object} postData - Post data { content?: string, images?: File[], privacy?: string }
 * @returns {Promise<{data: any, status: number}>}
 */
export const createPost = async (postData) => {
  const formData = new FormData();
  const contentValue = postData.content !== undefined && postData.content !== null 
    ? String(postData.content).trim() 
    : '';
  formData.append('content', contentValue);
  
  if (postData.images && Array.isArray(postData.images) && postData.images.length > 0) {
    postData.images.forEach((image) => {
      if (image instanceof File) {
        formData.append('images', image);
      }
    });
  }

  const privacy = postData.privacy || 'PUBLIC';
  formData.append('privacy', privacy);
  
  return apiFetch(API_ENDPOINTS.POST.CREATE, {
    method: 'POST',
    body: formData,
  });
};

/**
 * Update an existing post
 * @param {string} postId - Post ID
 * @param {Object} postData - Post data { content?: string, images?: File[], privacy?: string }
 * @returns {Promise<{data: any, status: number}>}
 */
export const updatePost = async (postId, postData) => {
  const formData = new FormData();
  
  if (postData.content) {
    formData.append('content', postData.content);
  }
  
  if (postData.images && Array.isArray(postData.images)) {
    postData.images.forEach((image) => {
      if (image instanceof File) {
        formData.append('images', image);
      }
    });
  }

  if (postData.privacy) {
    formData.append('privacy', postData.privacy);
  }

  return apiFetch(API_ENDPOINTS.POST.UPDATE.replace(':id', postId), {
    method: 'PUT',
    body: formData,
  });
};

/**
 * Delete a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const deletePost = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.DELETE.replace(':id', postId), {
    method: 'DELETE',
  });
};

/**
 * Save a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const savePost = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.SAVE.replace(':id', postId), {
    method: 'POST',
  });
};

/**
 * Unsave a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const unsavePost = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.UNSAVE.replace(':id', postId), {
    method: 'DELETE',
  });
};

/**
 * Get saved posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSavedPosts = async (page = 1, size = 10) => {
  return apiFetch(`${API_ENDPOINTS.POST.SAVED_POSTS}?page=${page}&size=${size}`);
};

/**
 * Get shared posts by user ID with pagination
 * @param {string} userId - User ID
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSharedPosts = async (userId, page = 1, size = 10) => {
  const endpoint = `${API_ENDPOINTS.POST.SHARED_POSTS.replace(':id', userId)}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Get share count for a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const getShareCount = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.SHARE_COUNT.replace(':id', postId));
};

/**
 * Check if a post is saved by current user
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const isPostSaved = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.IS_SAVED.replace(':id', postId));
};

/**
 * Get posts by user ID with pagination
 * @param {string} userId - User ID
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getUserPosts = async (userId, page = 1, size = 10) => {
  const endpoint = `${API_ENDPOINTS.POST.USER_POSTS.replace(':id', userId)}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Get current user's shared posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getMySharedPosts = async (page = 1, size = 10) => {
  return apiFetch(`${API_ENDPOINTS.POST.MY_SHARED_POSTS}?page=${page}&size=${size}`);
};

/**
 * Get saved posts count for current user
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSavedCount = async () => {
  return apiFetch(API_ENDPOINTS.POST.SAVED_COUNT);
};

/**
 * Search posts by keyword with pagination
 * @param {string} keyword - Search keyword
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: {result: {content: [], totalElements: number, totalPages: number}}, status: number}>}
 */
export const searchPosts = async (keyword, page = 1, size = 10) => {
  if (!keyword || keyword.trim().length === 0) {
    return { data: { result: { content: [], totalElements: 0, totalPages: 0 } }, status: 200 };
  }
  const endpoint = `${API_ENDPOINTS.POST.SEARCH}?keyword=${encodeURIComponent(keyword.trim())}&page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Search posts from friends (if supported by backend)
 * @param {string} keyword - Search keyword
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: {result: {content: [], totalElements: number, totalPages: number}}, status: number}>}
 */
export const searchFriendsPosts = async (keyword, page = 1, size = 10) => {
  if (!keyword || keyword.trim().length === 0) {
    return { data: { result: { content: [], totalElements: 0, totalPages: 0 } }, status: 200 };
  }
  // Note: This endpoint may not exist in backend. Using regular search as fallback.
  const endpoint = `${API_ENDPOINTS.POST.SEARCH}?keyword=${encodeURIComponent(keyword.trim())}&page=${page}&size=${size}`;
  return apiFetch(endpoint);
};
