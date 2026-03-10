<?php
/**
 * ThemePlus Helper Functions
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Get option value
 *
 * @param string|null $key Option key (null returns all options)
 * @param string|null $default Default value
 * @return mixed
 */
function themeplus_get_option(string $key = null, null|string $default = ''): mixed {
  // Check if ThemePlus is active
  if (!class_exists('ThemePlus_Settings')) {
    return $default;
  }

  // Return all options if no key provided
  if ($key === null) {
    return ThemePlus_Settings::get_all_options();
  }

  // Return specific option
  return ThemePlus_Settings::get_option($key, $default);
}

/**
 * Update option value
 *
 * @param string $key Option key
 * @param mixed $value Option value
 * @return bool
 */
function themeplus_update_option(string $key, mixed $value): bool {
  return ThemePlus_Settings::update_option($key, $value);
}

/**
 * Get plugin version
 *
 * @return string
 */
function themeplus_get_version(): string {
  return THEMEPLUS_VERSION;
}

/**
 * Check if ThemePlus is active
 *
 * @return bool
 */
function themeplus_is_active(): bool {
  return class_exists('ThemePlus_Settings');
}