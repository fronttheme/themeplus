<?php
/**
 * ThemePlus Sample Configuration File
 *
 * Copy, rename, customize, and include in your theme!
 *
 * 1. Copy this file to your theme folder
 * 2. Rename to something like: `themeplus-config.php`
 * 3. Customize all settings below
 * 4. Include in your theme's functions.php:
 *    require_once get_template_directory() . '/inc/themeplus-config.php';
 */

if (!defined('ABSPATH')) {
  exit;
}

// ========================================
// 1. FRAMEWORK CONFIGURATION (White-label)
// ========================================
add_action('after_setup_theme', function () {

  if (!function_exists('themeplus_framework_config')) {
    return;
  }

  $theme = wp_get_theme();

  themeplus_framework_config([

    // Basic Info
    'display_name'    => $theme->get('Name'),
    'display_version' => $theme->get('Version'),

    // Database Option Name (MUST BE UNIQUE!)
    'opt_name'        => 'my_theme_options_' . sanitize_title($theme->get('Name')),

    // Admin Menu
    'menu_slug'       => 'my-theme-settings',
    'menu_title'      => __('Theme Settings', 'your-textdomain'),
    'page_title'      => __('Theme Options', 'your-textdomain'),
    'menu_icon'       => 'dashicons-admin-appearance',
    'menu_position'   => 61,
    'capability'      => 'edit_theme_options',

    // Features
    'admin_bar'       => true,
    'show_search'     => true,
    'dev_mode'        => defined('WP_DEBUG') && WP_DEBUG,

    // i18n - Replace 'your-textdomain' with your actual theme text domain
    'text_domain'     => 'your-textdomain',

  ]);

});

// ========================================
// 2. SECTIONS & FIELDS
// ========================================
add_action('init', function () {

  if (!function_exists('themeplus_add_section')) {
    return;
  }

  // Section 1: General Settings
  themeplus_add_section([
    'id'     => 'general',
    'title'  => __('General Settings', 'your-textdomain'),
    'icon'   => 'cog',
    'fields' => [
      [
        'id'      => 'enable_preloader',
        'type'    => 'toggle',
        'title'   => __('Enable Preloader', 'your-textdomain'),
        'default' => true,
      ],
      [
        'id'       => 'preloader_loading_text',
        'type'     => 'text',
        'title'    => __('Preloader Loading Text', 'your-textdomain'),
        'subtitle' => __('Enter preloader loading text', 'your-textdomain'),
        'default'  => 'Loading...',
      ]
    ],
  ]);

  // Section 2: Color Settings
  themeplus_add_section([
    'id'     => 'colors',
    'title'  => __('Color Settings', 'your-textdomain'),
    'icon'   => 'palette',
    'fields' => [
      [
        'id'       => 'primary_color',
        'type'     => 'color',
        'title'    => __('Primary Color', 'your-textdomain'),
        'subtitle' => __('Main theme color', 'your-textdomain'),
        'default'  => '#2271b1',
      ],
      [
        'id'       => 'secondary_color',
        'type'     => 'color',
        'title'    => __('Secondary Color', 'your-textdomain'),
        'subtitle' => __('Secondary theme color', 'your-textdomain'),
        'default'  => '#646970',
      ],
      [
        'id'       => 'accent_color',
        'type'     => 'color',
        'title'    => __('Accent Color', 'your-textdomain'),
        'subtitle' => __('Accent color for highlights', 'your-textdomain'),
        'default'  => '#00a32a',
      ],
    ],
  ]);

  // Section 3: Social Media
  themeplus_add_section([
    'id'     => 'social',
    'title'  => __('Social Media', 'your-textdomain'),
    'icon'   => 'share-alt',
    'fields' => [
      [
        'id'    => 'social_links',
        'type'  => 'social_media',
        'title' => __('Social Media Links', 'your-textdomain'),
        'desc'  => __('Add your social media profile URLs', 'your-textdomain'),
      ],
      [
        'id'    => 'custom_social_icon',
        'type'  => 'icon',
        'title' => __('Custom Social Icon', 'your-textdomain'),
      ],
    ],
  ]);

  // Add more sections as needed...

});

// ========================================
// 3. HELPER FUNCTIONS (for your theme)
// ========================================

if (!function_exists('my_theme_get_option')) {
  /**
   * Get theme option value
   *
   * @param string $key Option key
   * @param mixed $default Default value
   * @return mixed
   */
  function my_theme_get_option(string $key, mixed $default = ''): mixed {
    if (function_exists('themeplus_get_option')) {
      return themeplus_get_option($key, $default);
    }
    return $default;
  }
}

// ========================================
// 4. USAGE EXAMPLES IN THEME FILES
// ========================================

/*
// In header.php or template files:
$primary_color = my_theme_get_option('primary_color', '#2271b1');
$enable_preloader = my_theme_get_option('enable_preloader', true);

// Conditional example:
if ($enable_preloader) {
    $loading_text = my_theme_get_option('preloader_loading_text', 'Loading...');
    echo '<div class="preloader">' . esc_html($loading_text) . '</div>';
}

// Inline CSS example:
echo '<style>
    :root {
        --primary-color: ' . esc_attr($primary_color) . ';
    }
</style>';
*/