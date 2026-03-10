<?php
/**
 * ThemePlus Admin Class
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Admin Class
 */
class ThemePlus_Admin {

  /**
   * Constructor
   */
  public function __construct() {
    add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    add_action('admin_head', [$this, 'clean_admin_page'], 999); // High priority
  }

  /**
   * Get menu slug from config
   */
  private function get_menu_slug(): string {
    return ThemePlus_Framework_Config::get('menu_slug', 'themeplus');
  }

  /**
   * Enqueue admin assets
   */
  public function enqueue_assets($hook): void {
    $menu_slug = $this->get_menu_slug();

    // Only load on our admin page
    if ('toplevel_page_' . $menu_slug !== $hook) {
      return;
    }

    $is_dev = defined('WP_DEBUG') && WP_DEBUG && defined('THEMEPLUS_DEV') && THEMEPLUS_DEV;
    $version = THEMEPLUS_VERSION;

    // Enqueue WordPress media library
    wp_enqueue_media();

    // Enqueue WordPress Code Editor
    wp_enqueue_code_editor([
        'type' => 'text/css', // or 'text/javascript', 'text/html', etc.
    ]);

    // This loads CodeMirror assets
    wp_enqueue_script('wp-theme-plugin-editor');
    wp_enqueue_style('wp-codemirror');

    // Enqueue FontAwesome
    wp_enqueue_style(
        'themeplus-fontawesome',
        THEMEPLUS_URL . 'assets/fonts/fontawesome/css/all.min.css',
        [],
        '7.2.0'
    );

    // JavaScript (webpack)
    $asset_file = THEMEPLUS_PATH . 'assets/js/admin.asset.php';

    if (file_exists($asset_file)) {
      $asset_data = include $asset_file;

      wp_enqueue_script(
          'themeplus-admin',
          THEMEPLUS_URL . 'assets/js/admin.js',
          $asset_data['dependencies'],
          $asset_data['version'],
          true
      );
    }

    // CSS
    if ($is_dev) {
      // Enqueue WordPress component styles for dev
      wp_enqueue_style('wp-components');

      // Development
      wp_enqueue_script(
          'vite-client',
          'http://localhost:3000/@vite/client',
          [],
          null,
          false
      );

      // Load the dev entry point that imports SCSS
      wp_enqueue_script(
          'themeplus-vite-main',
          'http://localhost:3000/src/js/main.js',
          [],
          null,
          false
      );

      add_filter('script_loader_tag', [$this, 'add_vite_module_type'], 10, 2);

      // Vite will inject CSS automatically via HMR

    } else {
      // Production: Built CSS file
      if (file_exists(THEMEPLUS_PATH . 'assets/css/admin.css')) {
        wp_enqueue_style(
            'themeplus-admin',
            THEMEPLUS_URL . 'assets/css/admin.css',
            ['wp-components', 'themeplus-fontawesome'],
            $version
        );
      }
    }

    // Add CSS to hide other notices
    wp_add_inline_style(
        'themeplus-admin', '
      .toplevel_page_' . esc_attr($menu_slug) . ' .notice:not(.themeplus-notice) {
        display: none !important;
      }
      
      .themeplus-notice {
        display: block !important;
        margin: 15px 0 !important;
      }
    '
    );

    // Set up REST API nonce middleware (handles authentication automatically)
    wp_add_inline_script(
        'themeplus-admin',
        sprintf(
            'wp.apiFetch.use( wp.apiFetch.createNonceMiddleware( "%s" ) );',
            wp_create_nonce('wp_rest')
        ),
        'before'
    );

    // Get active theme info
    $theme = wp_get_theme();

    // Localize script
    wp_localize_script('themeplus-admin', 'themePlusData', [
        'config'       => ThemePlus_Framework_Config::get_all(),
        'version'      => THEMEPLUS_VERSION,
        'pluginUrl'    => THEMEPLUS_URL,
        'imagesUrl'    => THEMEPLUS_URL . 'assets/images/',
        'restUrl'      => rest_url('themeplus/v1'), // Full REST API base URL
        'restNonce'    => wp_create_nonce('wp_rest'), // Available if needed manually
        'themeName'    => $theme->get('Name'),
        'themeVersion' => $theme->get('Version'),
        'isProVersion' => false, // feature flag
        'ajaxUrl'      => admin_url('admin-ajax.php'),
        'isDev'        => $is_dev,
        'i18n'         => [
            'saved' => __('Settings saved!', 'themeplus'),
            'error' => __('An error occurred.', 'themeplus'),
        ],
    ]);
  }

  /**
   * Clean up admin page - hide other notices
   */
  public function clean_admin_page(): void {
    $screen = get_current_screen();
    $menu_slug = $this->get_menu_slug();

    // Only on our ThemePlus page
    if (!$screen || !str_contains($screen->id, $menu_slug)) {
      return;
    }

    // CSS to hide all notices (except ThemePlus)
    ?>
    <style>
      /* Hide ALL notices on ThemePlus page */
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> .notice:not(.themeplus-notice),
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> .update-nag,
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> .updated {
        display: none !important;
      }
      /* Show only ThemePlus notices */
      .themeplus-notice {
        display: block !important;
        margin: 15px 0 !important;
        border-left-color: #2271b1 !important;
      }
      /* Optional: Clean up admin UI */
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> #wpbody-content > .notice {
        display: none;
      }
      /* Hide screen options & help tabs */
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> #screen-meta,
      .toplevel_page_<?php echo esc_attr($menu_slug); ?> #screen-meta-links {
        display: none;
      }
    </style>

    <!-- Optional: Remove admin footer text -->
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Remove footer text
        const footer = document.getElementById('footer-left');
        if (footer) {
          footer.innerHTML = '';
        }

        // Remove footer upgrade notice
        const upgrade = document.getElementById('footer-upgrade');
        if (upgrade) {
          upgrade.remove();
        }
      });
    </script>
    <?php

    // Remove admin notices via PHP
    remove_all_actions('admin_notices');
    remove_all_actions('all_admin_notices');
  }

  public function add_vite_module_type($tag, $handle) {
    if (in_array($handle, ['vite-client', 'themeplus-vite-main'])) {
      return str_replace('<script', '<script type="module"', $tag);
    }
    return $tag;
  }

  /**
   * Render admin page
   */
  public function render_admin_page(): void {
    echo '<div id="themeplus-root"></div>';
  }
}