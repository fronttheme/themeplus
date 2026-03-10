<?php
/**
 * ThemePlus Uninstall
 *
 * Fired when the plugin is uninstalled. Safely removes all
 * ThemePlus data including user-configured dynamic options.
 *
 * @package ThemePlus
 */

// If uninstall not called from WordPress, exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
  exit;
}

/**
 * Simple cleanup that handles dynamic option names
 */
function themeplus_uninstall_simple(): void {
  global $wpdb;

  // 1. Default options (always the same)
  delete_option('themeplus_options');
  delete_option('themeplus_custom_fonts');
  delete_option('themeplus_custom_fonts_css');

  // 2. Find and delete dynamic options created by users
  // Pattern: themeplus_options_xxxxxxxx (e.g., themeplus_options_mytheme)
  $options = $wpdb->get_col(
    $wpdb->prepare(
      "SELECT option_name FROM $wpdb->options 
       WHERE option_name LIKE %s",
      'themeplus_options_%'
    )
  );

  foreach ($options as $option_name) {
    delete_option($option_name);
  }

  // 3. Clean up other possible patterns (extra safety)
  $common_patterns = [
    'themeplus_%_options',    // Matches: themeplus_mytheme_options
    '%_themeplus_settings',   // Matches: my_themeplus_settings (less common)
  ];

  foreach ($common_patterns as $pattern) {
    $options = $wpdb->get_col(
      $wpdb->prepare(
        "SELECT option_name FROM $wpdb->options 
         WHERE option_name LIKE %s",
        $pattern
      )
    );

    foreach ($options as $option_name) {
      delete_option($option_name);
    }
  }

  // 4. Multisite cleanup (clean every site in network)
  if (is_multisite()) {
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");

    foreach ($blog_ids as $blog_id) {
      switch_to_blog($blog_id);

      // Delete default options for this site
      delete_option('themeplus_options');
      delete_option('themeplus_custom_fonts');
      delete_option('themeplus_custom_fonts_css');

      // Delete dynamic options for this site
      $site_options = $wpdb->get_col(
        $wpdb->prepare(
          "SELECT option_name FROM $wpdb->options 
           WHERE option_name LIKE %s",
          'themeplus_options_%'
        )
      );

      foreach ($site_options as $option_name) {
        delete_option($option_name);
      }

      restore_current_blog();
    }
  }

  // 5. Clear WordPress object cache
  wp_cache_flush();
}

// Run cleanup
themeplus_uninstall_simple();