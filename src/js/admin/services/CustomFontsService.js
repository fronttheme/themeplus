/**
 * Custom Fonts Service
 *
 * Handles API calls for custom fonts using WordPress apiFetch
 *
 * File: src/js/admin/services/CustomFontsService.js
 */

import apiFetch from '@wordpress/api-fetch';

class CustomFontsService {

  /**
   * Get all custom fonts
   */
  async getFonts() {
    try {
      const data = await apiFetch({
        path: '/themeplus/v1/custom-fonts',
        method: 'GET',
      });

      return Object.values(data);
    } catch (error) {
      console.error('Error fetching custom fonts:', error);
      return [];
    }
  }

  /**
   * Get font names only (public endpoint)
   */
  async getFontNames() {
    try {
      const data = await apiFetch({
        path: '/themeplus/v1/custom-fonts/names',
        method: 'GET',
      });

      return data;
    } catch (error) {
      console.error('Error fetching font names:', error);
      return [];
    }
  }

  /**
   * Add custom font
   */
  async addFont(data) {
    try {
      const result = await apiFetch({
        path: '/themeplus/v1/custom-fonts',
        method: 'POST',
        data: data,
      });

      return result;
    } catch (error) {
      console.error('Error adding font:', error);
      throw error;
    }
  }

  /**
   * Update custom font
   */
  async updateFont(id, data) {
    try {
      const result = await apiFetch({
        path: `/themeplus/v1/custom-fonts/${id}`,
        method: 'PUT',
        data: data,
      });

      return result;
    } catch (error) {
      console.error('Error updating font:', error);
      throw error;
    }
  }

  /**
   * Delete custom font
   */
  async deleteFont(id) {
    try {
      const result = await apiFetch({
        path: `/themeplus/v1/custom-fonts/${id}`,
        method: 'DELETE',
      });

      return result;
    } catch (error) {
      console.error('Error deleting font:', error);
      throw error;
    }
  }
}

export default new CustomFontsService();