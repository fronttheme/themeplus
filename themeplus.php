<?php
/**
 * Plugin Name: ThemePlus
 * Plugin URI: https://www.fronttheme.com/products/themeplus
 * Description: A modern theme options framework for WordPress
 * Version: 1.0.0
 * Author: Faruk Ahmed
 * Author URI: https://fronttheme.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: themeplus
 * Domain Path: /languages
 * Requires at least: 6.8
 * Requires PHP: 8.0
 *
 * @package ThemePlus
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

// Define plugin constants
define('THEMEPLUS_VERSION', '1.0.0');
define('THEMEPLUS_FILE', __FILE__);
define('THEMEPLUS_PATH', plugin_dir_path(__FILE__));
define('THEMEPLUS_URL', plugin_dir_url(__FILE__));
define('THEMEPLUS_BASENAME', plugin_basename(__FILE__));

// Require the main plugin class
require_once THEMEPLUS_PATH . 'includes/class-themeplus.php';

/**
 * Initialize the plugin
 */
function themeplus_init(): ?ThemePlus {
  return ThemePlus::instance();
}

themeplus_init();