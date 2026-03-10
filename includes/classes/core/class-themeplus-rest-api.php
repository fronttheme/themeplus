<?php
/**
 * ThemePlus REST API Class
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * REST API Class
 */
class ThemePlus_REST_API {

  /**
   * Namespace
   */
  const NAMESPACE = 'themeplus/v1';

  /**
   * Constructor
   */
  public function __construct() {
    add_action('rest_api_init', [$this, 'register_routes']);
  }

  /**
   * Register REST routes
   */
  public function register_routes(): void {
    // Get all options
    register_rest_route(self::NAMESPACE, '/options', [
      'methods'             => 'GET',
      'callback'            => [$this, 'get_options'],
      'permission_callback' => [$this, 'check_permission'],
    ]);

    // Save options
    register_rest_route(self::NAMESPACE, '/options', [
      'methods'             => 'POST',
      'callback'            => [$this, 'save_options'],
      'permission_callback' => [$this, 'check_permission'],
      'args'                => [
        'options' => [
          'required'          => true,
          'type'              => 'object',
          'validate_callback' => function ($param) {
            return is_array($param) || is_object($param);
          }
        ],
      ],
    ]);

    // Reset options
    register_rest_route(self::NAMESPACE, '/options/reset', [
      'methods'             => 'POST',
      'callback'            => [$this, 'reset_options'],
      'permission_callback' => [$this, 'check_permission'],
    ]);

    // Get configuration
    register_rest_route(self::NAMESPACE, '/config', [
      'methods'             => 'GET',
      'callback'            => [$this, 'get_config'],
      'permission_callback' => [$this, 'check_permission'],
    ]);

    // Reset section
    register_rest_route(self::NAMESPACE, '/options/reset-section', [
      'methods'             => 'POST',
      'callback'            => [$this, 'reset_section'],
      'permission_callback' => [$this, 'check_permission'],
      'args'                => [
        'section_id' => [
          'required' => true,
          'type'     => 'string',
        ],
      ],
    ]);

    // Dev panel endpoint (only in dev mode)
    if (ThemePlus_Framework_Config::is_dev_mode()) {
      register_rest_route(self::NAMESPACE, '/dev-panel', [
        'methods'             => 'GET',
        'callback'            => [$this, 'get_dev_panel_data'],
        'permission_callback' => [$this, 'check_permission']
      ]);
    }

  }

  /**
   * Check permission
   * For GET requests from admin pages, allow if user has manage_options capability
   * For POST requests, require nonce verification
   *
   * @param WP_REST_Request $request Request object
   * @return bool|WP_Error
   */
  public function check_permission(WP_REST_Request $request): WP_Error|bool {
    // Check if user has required capability
    if (!current_user_can('manage_options')) {
      return new WP_Error(
        'rest_forbidden',
        __('Sorry, you are not allowed to do that.', 'themeplus'),
        ['status' => 403]
      );
    }

    // For POST requests, verify nonce
    if ($request->get_method() === 'POST') {
      $nonce = $request->get_header('X-WP-Nonce');

      if (!$nonce || !wp_verify_nonce($nonce, 'wp_rest')) {
        return new WP_Error(
          'rest_cookie_invalid_nonce',
          __('Cookie check failed', 'themeplus'),
          ['status' => 403]
        );
      }
    }

    return true;
  }

  /**
   * Get options
   *
   * @param WP_REST_Request $request Request object
   * @return WP_REST_Response|WP_Error
   */
  public function get_options(WP_REST_Request $request): WP_Error|WP_REST_Response {
    try {
      $options = ThemePlus_Settings::get_all_options();

      return rest_ensure_response([
        'success' => true,
        'data'    => $options,
      ]);
    } catch (Exception $e) {
      return new WP_Error(
        'rest_error',
        $e->getMessage(),
        ['status' => 500]
      );
    }
  }

  /**
   * Save options
   *
   * @param WP_REST_Request $request Request object
   * @return WP_REST_Response|WP_Error
   */
  public function save_options(WP_REST_Request $request): WP_Error|WP_REST_Response {
    try {
      $options = $request->get_param('options');

      if (empty($options) && !is_array($options)) {
        return new WP_Error(
          'rest_invalid_param',
          __('Options parameter is required.', 'themeplus'),
          ['status' => 400]
        );
      }

      // Force update even if value hasn't changed
      ThemePlus_Settings::update_all_options($options);

      return rest_ensure_response([
        'success' => true,
        'message' => __('Options saved successfully.', 'themeplus'),
        'data'    => $options,
      ]);
    } catch (Exception $e) {
      return new WP_Error(
        'rest_error',
        $e->getMessage(),
        ['status' => 500]
      );
    }
  }

  /**
   * Get configuration
   *
   * @param WP_REST_Request $request Request object
   * @return WP_REST_Response|WP_Error
   */
  public function get_config(WP_REST_Request $request): WP_Error|WP_REST_Response {
    try {
      $config = [
        'sections' => ThemePlus_Config::get_sections(),
        'fields'   => ThemePlus_Config::get_all_fields(),
      ];

      return rest_ensure_response([
        'success' => true,
        'data'    => $config,
      ]);
    } catch (Exception $e) {
      return new WP_Error(
        'rest_error',
        $e->getMessage(),
        ['status' => 500]
      );
    }
  }

  /**
   * Reset section to defaults
   *
   * @param WP_REST_Request $request Request object
   * @return WP_REST_Response|WP_Error
   */
  public function reset_section(WP_REST_Request $request): WP_Error|WP_REST_Response {
    try {
      $section_id = $request->get_param('section_id');
      $section = ThemePlus_Config::get_section($section_id);

      if (!$section) {
        return new WP_Error(
          'rest_invalid_section',
          __('Section not found.', 'themeplus'),
          ['status' => 404]
        );
      }

      $current_options = ThemePlus_Settings::get_all_options();

      // Get all fields from section and subsections
      $fields = $section['fields'] ?? [];
      foreach ($section['subsections'] ?? [] as $subsection) {
        $fields = array_merge($fields, $subsection['fields'] ?? []);
      }

      // Reset fields to default values
      foreach ($fields as $field) {
        if (isset($field['default'])) {
          $current_options[$field['id']] = $field['default'];
        } else {
          unset($current_options[$field['id']]);
        }
      }

      ThemePlus_Settings::update_all_options($current_options);

      return rest_ensure_response([
        'success' => true,
        'message' => __('Section reset successfully.', 'themeplus'),
        'data'    => $current_options,
      ]);
    } catch (Exception $e) {
      return new WP_Error(
        'rest_error',
        $e->getMessage(),
        ['status' => 500]
      );
    }
  }

  /**
   * Reset options
   *
   * @param WP_REST_Request $request Request object
   * @return WP_REST_Response|WP_Error
   */
  public function reset_options(WP_REST_Request $request): WP_Error|WP_REST_Response {
    try {
      // Get all default values
      $all_fields = ThemePlus_Config::get_all_fields();
      $default_options = [];

      foreach ($all_fields as $field_id => $field) {
        if (isset($field['default'])) {
          $default_options[$field_id] = $field['default'];
        }
      }

      // Update with defaults
      ThemePlus_Settings::update_all_options($default_options);

      return rest_ensure_response([
        'success' => true,
        'message' => __('Options reset successfully.', 'themeplus'),
        'data'    => $default_options,
      ]);
    } catch (Exception $e) {
      return new WP_Error(
        'rest_error',
        $e->getMessage(),
        ['status' => 500]
      );
    }
  }

  /**
   * Get dev panel data
   *
   * @return WP_REST_Response
   */
  public function get_dev_panel_data(): WP_REST_Response {
    return rest_ensure_response([
      'fields'     => ThemePlus_Dev_Panel::get_field_metadata(),
      'statistics' => ThemePlus_Dev_Panel::get_statistics(),
    ]);
  }

}