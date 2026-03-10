<?php
/**
 * ThemePlus Default Configuration
 * Define all sections and fields here
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Register default sections
 */
function themeplus_register_default_config(): void {

  // ========================================
  // Custom Fonts
  // ========================================
  themeplus_add_section([
    'id'       => 'custom-fonts',
    'title'    => __('Custom Fonts', 'themeplus'),
    'icon'     => 'fa-solid fa-font',
    'priority' => 90,
    'fields'   => [],
  ]);

  // ========================================
  // Import/Export
  // ========================================
  themeplus_add_section([
    'id'       => 'import-export',
    'title'    => __('Import/Export', 'themeplus'),
    'icon'     => 'fa-solid fa-database',
    'priority' => 100,
    'fields'   => [],
  ]);

  // ========================================
  // Developer Panel (Dev mode only)
  // ========================================
  if (ThemePlus_Framework_Config::is_dev_mode()) {
    themeplus_add_section([
      'id'       => 'developer-panel',
      'title'    => __('Developer Panel', 'themeplus'),
      'icon'     => 'fa-solid fa-laptop-code',
      'priority' => 999, // Last section
      'fields'   => [], // No fields, React will handle rendering
    ]);
  }

}

// Register configuration on init
add_action('init', 'themeplus_register_default_config');