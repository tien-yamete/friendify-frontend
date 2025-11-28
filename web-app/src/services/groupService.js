import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get current user's groups
 * @returns {Promise<{data: any, status: number}>}
 */
export const getMyGroups = async () => {
  return apiFetch(API_ENDPOINTS.GROUP.MY_GROUPS);
};

/**
 * Get suggested groups for current user
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSuggestedGroups = async () => {
  return apiFetch(API_ENDPOINTS.GROUP.SUGGESTED);
};

/**
 * Discover groups
 * @returns {Promise<{data: any, status: number}>}
 */
export const getDiscoverGroups = async () => {
  return apiFetch(API_ENDPOINTS.GROUP.DISCOVER);
};

/**
 * Get group detail by ID
 * @param {string} groupId - Group ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const getGroupDetail = async (groupId) => {
  return apiFetch(API_ENDPOINTS.GROUP.DETAIL.replace(':id', groupId));
};

/**
 * Get group members
 * @param {string} groupId - Group ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const getGroupMembers = async (groupId) => {
  return apiFetch(API_ENDPOINTS.GROUP.MEMBERS.replace(':id', groupId));
};

/**
 * Get group posts with pagination
 * @param {string} groupId - Group ID
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getGroupPosts = async (groupId, page = 1, size = 20) => {
  const endpoint = `${API_ENDPOINTS.GROUP.POSTS.replace(':id', groupId)}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Create a new group
 * @param {Object} groupData - Group data
 * @returns {Promise<{data: any, status: number}>}
 */
export const createGroup = async (groupData) => {
  return apiFetch(API_ENDPOINTS.GROUP.CREATE, {
    method: 'POST',
    body: JSON.stringify(groupData),
  });
};

/**
 * Join a group
 * @param {string} groupId - Group ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const joinGroup = async (groupId) => {
  return apiFetch(API_ENDPOINTS.GROUP.JOIN.replace(':id', groupId), {
    method: 'POST',
  });
};

/**
 * Leave a group
 * @param {string} groupId - Group ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const leaveGroup = async (groupId) => {
  return apiFetch(API_ENDPOINTS.GROUP.LEAVE.replace(':id', groupId), {
    method: 'POST',
  });
};

/**
 * Create a post in a group
 * @param {string} groupId - Group ID
 * @param {Object} postData - Post data
 * @returns {Promise<{data: any, status: number}>}
 */
export const createGroupPost = async (groupId, postData) => {
  return apiFetch(API_ENDPOINTS.GROUP.POSTS.replace(':id', groupId), {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};
