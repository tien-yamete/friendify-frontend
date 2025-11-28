import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get notifications with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Page size (default: 20)
 * @returns {Promise<{data: any, status: number}>}
 */
export const getNotifications = async (page = 1, size = 20) => {
  const endpoint = `${API_ENDPOINTS.NOTIFICATION.LIST}?page=${page}&size=${size}`;
  return apiFetch(endpoint);
};

/**
 * Mark a notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const markAsRead = async (notificationId) => {
  return apiFetch(API_ENDPOINTS.NOTIFICATION.MARK_READ.replace(':id', notificationId), {
    method: 'PUT',
  });
};

/**
 * Mark all notifications as read
 * @returns {Promise<{data: any, status: number}>}
 */
export const markAllAsRead = async () => {
  return apiFetch(API_ENDPOINTS.NOTIFICATION.MARK_ALL_READ, {
    method: 'PUT',
  });
};

/**
 * Delete a notification
 * @param {string} notificationId - Notification ID
 * @returns {Promise<{data: any, status: number}>}
 */
export const deleteNotification = async (notificationId) => {
  return apiFetch(API_ENDPOINTS.NOTIFICATION.DELETE.replace(':id', notificationId), {
    method: 'DELETE',
  });
};
