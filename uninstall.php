<?php
/**
 * ThemePlus Uninstall
 *
 * Fired when the plugin is deleted via the Plugins screen. Removes all
 * ThemePlus options, including dynamic option names registered by themes
 * via themeplus_framework_config(). No wildcard database queries are used —
 * only explicitly tracked option names are deleted.
 *
 * @package ThemePlus
 */

// If uninstall not called from WordPress, exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
  exit;
}

/**
 * Delete all known ThemePlus options for a single site.
 */
function themeplus_uninstall_delete_site_options(): void {
  // 1. Default options created by the plugin itself.
  delete_option('themeplus_options');
  delete_option('themeplus_custom_fonts');
  delete_option('themeplus_custom_fonts_css');

  // 2. Dynamic opt_name values registered by themes via
  // themeplus_framework_config(). Tracked explicitly at registration
  // time — no wildcard LIKE queries against the options table.
  $known_opt_names = get_option('themeplus_known_opt_names', []);

  foreach ($known_opt_names as $opt_name) {
    delete_option($opt_name);
  }

  delete_option('themeplus_known_opt_names');
}

/**
 * Run the uninstall cleanup across the site or, on multisite, every site
 * in the network.
 */
function themeplus_uninstall_simple(): void {
  if (is_multisite()) {
    $site_ids = get_sites(['fields' => 'ids']);

    foreach ($site_ids as $site_id) {
      switch_to_blog($site_id);
      themeplus_uninstall_delete_site_options();
      restore_current_blog();
    }
  } else {
    themeplus_uninstall_delete_site_options();
  }

  wp_cache_flush();
}

themeplus_uninstall_simple();