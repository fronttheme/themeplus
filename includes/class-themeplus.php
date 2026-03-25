<?php
/**
 * Main ThemePlus Class
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Main ThemePlus Class
 */
final class ThemePlus {

  /**
   * Plugin instance
   *
   * @var ThemePlus|null
   */
  private static ?ThemePlus $instance = null;

  /**
   * Get plugin instance
   *
   * @return ThemePlus|null
   */
  public static function instance(): ?ThemePlus {
    if (is_null(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Constructor
   */
  private function __construct() {
    $this->includes();
    $this->init_hooks();
  }

  /**
   * Include required files
   */
  private function includes(): void {
    // ======================
    // 1. CORE CONFIGURATION
    // ======================
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-framework-config.php';

    // ======================
    // 2. CORE CLASSES
    // ======================
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-config.php';
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-settings.php';
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-frontend.php';
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-rest-api.php';
    require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-admin.php';

    // ======================
    // 3. CUSTOM FONTS MODULE
    // ======================
    require_once THEMEPLUS_PATH . 'includes/classes/custom-fonts/class-custom-fonts-manager.php';
    require_once THEMEPLUS_PATH . 'includes/classes/custom-fonts/class-custom-fonts-api.php';
    require_once THEMEPLUS_PATH . 'includes/classes/custom-fonts/class-custom-fonts-frontend.php';
    require_once THEMEPLUS_PATH . 'includes/classes/custom-fonts/class-custom-fonts-mime-type.php';

    // ======================
    // 4. HELPER FUNCTIONS
    // ======================
    require_once THEMEPLUS_PATH . 'includes/functions/framework-config.php';
    require_once THEMEPLUS_PATH . 'includes/functions/helper-functions.php';
    require_once THEMEPLUS_PATH . 'includes/functions/config-functions.php';

    // ======================
    // 5. DEFAULT CONFIGURATION
    // ======================
    require_once THEMEPLUS_PATH . 'includes/config/default-config.php';

    // ======================
    // 6. DEVELOPMENT TOOLS
    // ======================
    if (ThemePlus_Framework_Config::is_dev_mode()) {
      require_once THEMEPLUS_PATH . 'includes/classes/core/class-themeplus-dev-panel.php';
    }
  }

  /**
   * Initialize hooks
   */
  private function init_hooks(): void {
    add_action('init', [$this, 'load_textdomain']);
    add_action('admin_menu', [$this, 'register_admin_menu']);
    add_action('rest_api_init', [new ThemePlus_REST_API(), 'register_routes']);

    // Initialize frontend
    ThemePlus_Frontend::init();

    // Initialize admin
    if (is_admin()) {
      new ThemePlus_Admin();
    }
  }

  /**
   * Load plugin textdomain
   */
  public function load_textdomain(): void {
    load_plugin_textdomain(
      'themeplus',
      false,
      dirname(THEMEPLUS_BASENAME) . '/languages'
    );
  }

  /**
   * Register admin menu
   */
  public function register_admin_menu(): void {
    add_menu_page(
      ThemePlus_Framework_Config::get('page_title'),
      ThemePlus_Framework_Config::get('menu_title'),
      ThemePlus_Framework_Config::get('capability'),
      ThemePlus_Framework_Config::get('menu_slug'),
      [new ThemePlus_Admin(), 'render_admin_page'],
      ThemePlus_Framework_Config::get('menu_icon'),
      ThemePlus_Framework_Config::get('menu_position')
    );
  }

}