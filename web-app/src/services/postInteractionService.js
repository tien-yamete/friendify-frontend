import { apiFetch } from './apiHelper';
import { API_ENDPOINTS } from '../config/apiConfig';

// --- LIKE ---

/**
 * Like a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const likePost = async (postId) => {
  // Backend yêu cầu POST body: { postId: "..." }
  return apiFetch(API_ENDPOINTS.INTERACTION.LIKE, {
    method: 'POST',
    body: JSON.stringify({ postId: postId }),
  });
};

/**
 * Unlike a post
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const unlikePost = async (postId) => {
  return apiFetch(API_ENDPOINTS.INTERACTION.UNLIKE_POST.replace(':id', postId), {
    method: 'DELETE',
  });
};

/**
 * Get post likes with pagination
 * @param {string} postId - Post ID
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getPostLikes = async (postId, page = 1, size = 10) => {
  const endpoint = `${API_ENDPOINTS.INTERACTION.GET_POST_LIKES.replace(':id', postId)}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

// --- COMMENT ---

/**
 * Comment on a post
 * @param {string} postId - Post ID
 * @param {string} commentText - Comment content
 * @param {string|null} parentCommentId - Parent comment ID for replies (optional)
 * @returns {Promise<{data: any, status: number}>}
 */
export const commentOnPost = async (postId, commentText, parentCommentId = null) => {
  const body = { postId, content: commentText };
  if (parentCommentId) body.parentCommentId = parentCommentId;

  return apiFetch(API_ENDPOINTS.INTERACTION.CREATE_COMMENT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * Get post comments with pagination
 * @param {string} postId - Post ID
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getPostComments = async (postId, page = 1, size = 20) => {
  const endpoint = `${API_ENDPOINTS.INTERACTION.GET_POST_COMMENTS.replace(':id', postId)}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Update a comment
 * @param {string} commentId - Comment ID
 * @param {string} commentText - Updated comment content
 * @returns {Promise<{data: any, status: number}>}
 */
export const updateComment = async (commentId, commentText) => {
  return apiFetch(API_ENDPOINTS.INTERACTION.UPDATE_COMMENT.replace(':id', commentId), {
    method: 'PUT',
    body: JSON.stringify({ content: commentText }),
  });
};

/**
 * Delete a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const deleteComment = async (commentId) => {
  return apiFetch(API_ENDPOINTS.INTERACTION.DELETE_COMMENT.replace(':id', commentId), {
    method: 'DELETE',
  });
};

/**
 * Like a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const likeComment = async (commentId) => {
  return apiFetch(API_ENDPOINTS.INTERACTION.LIKE, {
    method: 'POST',
    body: JSON.stringify({ commentId }),
  });
};

/**
 * Unlike a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const unlikeComment = async (commentId) => {
  return apiFetch(API_ENDPOINTS.INTERACTION.UNLIKE_COMMENT.replace(':id', commentId), {
    method: 'DELETE',
  });
};

// --- POST ---

/**
 * Share a post
 * @param {string} postId - Post ID
 * @param {string|null} content - Optional share content
 * @returns {Promise<{data: any, status: number}>}
 */
export const sharePost = async (postId, content) => {
  // Backend Post Service dùng @RequestParam cho content
  const url = API_ENDPOINTS.POST.SHARE.replace(':id', postId);
  const finalUrl = content 
    ? `${url}?content=${encodeURIComponent(content)}` 
    : url;

  return apiFetch(finalUrl, {
    method: 'POST',
  });
};

/**
 * Update a post (duplicate - should use postService.updatePost instead)
 * @param {string} postId - Post ID
 * @param {FormData|Object} postData - Post data (FormData if has images)
 * @returns {Promise<{data: any, status: number}>}
 */
export const updatePost = async (postId, postData) => {
  return apiFetch(API_ENDPOINTS.POST.UPDATE.replace(':id', postId), {
    method: 'PUT',
    body: postData, 
  });
};

/**
 * Delete a post (duplicate - should use postService.deletePost instead)
 * @param {string} postId - Post ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const deletePost = async (postId) => {
  return apiFetch(API_ENDPOINTS.POST.DELETE.replace(':id', postId), {
    method: 'DELETE',
  });
};