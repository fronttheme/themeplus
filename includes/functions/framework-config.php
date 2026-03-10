<?php
/**
 * ThemePlus Framework Config Helper
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Configure ThemePlus Framework
 */
function themeplus_framework_config(array $config = []): void {
  if (class_exists('ThemePlus_Framework_Config')) {
    ThemePlus_Framework_Config::set($config);
  }
}

/**
 * Get framework config value
 */
function themeplus_get_framework_config(string $key, $default = '') {
  if (class_exists('ThemePlus_Framework_Config')) {
    return ThemePlus_Framework_Config::get($key, $default);
  }
  return $default;
}

/**
 * Check if dev mode is enabled
 */
function themeplus_is_dev_mode(): bool {
  return (bool)themeplus_get_framework_config('dev_mode', false);
}