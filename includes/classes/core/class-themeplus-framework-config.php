<?php
/**
 * ThemePlus Framework Configuration (White-label settings)
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

class ThemePlus_Framework_Config {

  // User white-label config
  private static array $framework_config = [];

  // Defaults
  private static function get_defaults(): array {
    // ThemePlus SVG icon
    $svg_icon = 'data:image/svg+xml;base64,' . base64_encode(
        '<svg id="themeplus-admin-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="47.61" viewBox="0 0 50 47.61">
<path d="M48.89,20.34c-1.24-2.21-3.35-3.88-5.94-4.7-2.75-.87-5.74-.7-8.64.5-.41.16-3.58,1.47-7.39,5.64-2.28,2.49-4.37,5.53-6.2,9.03-.11.21-.23.43-.34.65-1.1-.59-2.02-1.3-2.74-2.13,2.67-3.67,5.06-8.44,6-10.39,1.63-3.4,3.02-6.84,3.93-9.69.7-2.2,1.56-5.35.97-7.24-.46-1.47-1.77-2.25-3.27-1.94-3.4.72-7.41,6.69-8.18,7.88l-.81,1.28,4.03.76.31-.47c1.05-1.57,2.17-2.97,3.24-4.05.37-.37.69-.66.96-.89-.14.86-.44,2.17-1.09,4.12-1.38,4.14-3.74,9.36-6.16,13.63-.61,1.07-1.21,2.06-1.79,2.97-.15-.88-.2-1.83-.14-2.84.06-.91.21-1.9.44-2.92l.78-3.36-5.02,5.82-.02.29c-.15,2.52.23,4.79,1.13,6.76-.88.95-1.41,1.27-1.66,1.37-1.74.73-3.47.48-5.28-.75-1.47-1.01-2.41-2.32-2.42-2.33l-.49-.69-1.55,1.09h0s0,0,0,0l-1.56,1.09.49.7c.05.07,1.29,1.83,3.33,3.25,2.9,2.01,6,2.41,8.96,1.17.75-.32,1.53-.87,2.37-1.68.99,1.04,2.2,1.93,3.61,2.66-1.42,3.31-2.65,6.98-3.67,10.91l-.21.82,3.69.96.21-.82c.99-3.83,2.2-7.39,3.58-10.58,1.37.25,4.14.69,7.41.75,2.76.06,5.33-.16,7.63-.64,2.97-.62,5.51-1.68,7.55-3.16,2.45-1.78,4.09-3.96,4.73-6.31.6-2.19.31-4.51-.81-6.51ZM46.02,25.85c-.41,1.5-1.55,2.96-3.29,4.23-2.04,1.48-5.92,3.21-12.83,3.08-2.34-.05-4.41-.3-5.83-.52,1.65-3.16,3.52-5.9,5.54-8.14,1.79-1.98,3.37-3.19,4.38-3.85,1.03-.68,1.68-.93,1.69-.93l.06-.03c2.62-1.09,4.74-.82,6.06-.4,1.64.52,3.01,1.59,3.76,2.93.64,1.14.8,2.4.46,3.64ZM7.71,7.6l12.6,2.39-8.37,9.72.51-6.97-4.74-5.14Z" fill="currentColor"/>
</svg>'
      );

    return [
      // Basic
      'opt_name'      => 'themeplus_options',
      'display_name'  => '', // Theme/Plugin name for display

      // Menu
      'menu_slug'     => 'themeplus',
      'menu_title'    => __('ThemePlus', 'themeplus'),
      'page_title'    => __('ThemePlus Options', 'themeplus'),
      'menu_icon'     => $svg_icon,
      'menu_position' => 59,
      'capability'    => 'manage_options',

      // Features
      'admin_bar'     => true,
      'dev_mode'      => false,
      'show_search'   => true,

      // i18n text domain
      'text_domain'   => 'themeplus',
    ];
  }

  /**
   * Set framework configuration (called by theme/plugin)
   */
  public static function set(array $config): void {
    $defaults = self::get_defaults();

    // If display_name is provided, use it for menu titles
    if (!empty($config['display_name'])) {
      $display_name = $config['display_name'];
      $text_domain = $config['text_domain'] ?? 'themeplus';

      // Update defaults with custom display name
      $defaults['menu_title'] = sprintf(__('%s Settings', $text_domain), $display_name);
      $defaults['page_title'] = sprintf(__('%s Options', $text_domain), $display_name);
    }

    // Merge user config with (possibly updated) defaults
    self::$framework_config = wp_parse_args($config, $defaults);
  }

  /**
   * Get framework config value
   */
  public static function get(string $key, $default = '') {
    $config = self::get_all();
    return $config[$key] ?? $default;
  }

  /**
   * Get all framework config
   */
  public static function get_all(): array {
    if (empty(self::$framework_config)) {
      // Return defaults if no user config
      return self::get_defaults();
    }
    return self::$framework_config;
  }

  /**
   * Check if user has configured the framework
   */
  public static function is_configured(): bool {
    return !empty(self::$framework_config);
  }

  /**
   * Check if development mode is enabled
   */
  public static function is_dev_mode(): bool {
    $is_dev = false;

    // 1. Custom constant (highest priority)
    if (defined('THEMEPLUS_DEV')) {
      $is_dev = THEMEPLUS_DEV;
    } // 2. WordPress debug mode
    elseif (defined('WP_DEBUG') && WP_DEBUG) {
      $is_dev = true;
    } // 3. WordPress environment
    elseif (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'local') {
      $is_dev = true;
    }

    // 4. Filter for custom conditions
    return apply_filters('themeplus/is_dev_mode', $is_dev);
  }

}