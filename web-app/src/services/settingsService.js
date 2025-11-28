import { API_ENDPOINTS } from '../config/apiConfig';
import { apiFetch } from './apiHelper';

/**
 * Get user settings
 * @returns {Promise<{data: any, status: number}>}
 */
export const getSettings = async () => {
  return apiFetch(API_ENDPOINTS.SETTINGS.GET);
};

/**
 * Update settings for a specific section
 * @param {string} section - Settings section name
 * @param {Object} settingsData - Settings data to update
 * @returns {Promise<{data: any, status: number}>}
 */
export const updateSettings = async (section, settingsData) => {
  const endpoint = API_ENDPOINTS.SETTINGS.UPDATE.replace(':section', section);
  return apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  });
};

/**
 * Change user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<{data: any, status: number}>}
 */
export const changePassword = async (currentPassword, newPassword) => {
  return apiFetch(API_ENDPOINTS.SETTINGS.CHANGE_PASSWORD, {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

/**
 * Delete user account
 * @returns {Promise<{data: any, status: number}>}
 */
export const deleteAccount = async () => {
  return apiFetch(API_ENDPOINTS.SETTINGS.DELETE_ACCOUNT, {
    method: 'DELETE',
  });
};
