<?php
/**
 * ThemePlus Custom Fonts REST API
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH'))
  exit;

class ThemePlus_Custom_Fonts_API {

  /**
   * Manager instance
   */
  private ThemePlus_Custom_Fonts_Manager $manager;

  /**
   * Constructor
   */
  public function __construct() {
    $this->manager = ThemePlus_Custom_Fonts_Manager::instance();

    add_action('rest_api_init', array($this, 'custom_fonts_register_routes'));
  }

  /**
   * Register REST API routes
   */
  public function custom_fonts_register_routes(): void {
    // Get all fonts
    register_rest_route('themeplus/v1', '/custom-fonts', array(
      'methods'             => 'GET',
      'callback'            => array($this, 'get_fonts'),
      'permission_callback' => array($this, 'check_permissions'),
    ));

    // Get font names only
    register_rest_route('themeplus/v1', '/custom-fonts/names', array(
      'methods'             => 'GET',
      'callback'            => array($this, 'get_font_names'),
      'permission_callback' => '__return_true', // Public endpoint
    ));

    // Add font
    register_rest_route('themeplus/v1', '/custom-fonts', array(
      'methods'             => 'POST',
      'callback'            => array($this, 'add_font'),
      'permission_callback' => array($this, 'check_permissions'),
      'args'                => array(
        'name'  => array(
          'required'          => true,
          'type'              => 'string',
          'sanitize_callback' => 'sanitize_text_field',
        ),
        'files' => array(
          'required' => true,
          'type'     => 'object',
        ),
      ),
    ));

    // Update font
    register_rest_route('themeplus/v1', '/custom-fonts/(?P<id>[a-zA-Z0-9_-]+)', array(
      'methods'             => 'PUT',
      'callback'            => array($this, 'update_font'),
      'permission_callback' => array($this, 'check_permissions'),
    ));

    // Delete font
    register_rest_route('themeplus/v1', '/custom-fonts/(?P<id>[a-zA-Z0-9_-]+)', array(
      'methods'             => 'DELETE',
      'callback'            => array($this, 'delete_font'),
      'permission_callback' => array($this, 'check_permissions'),
    ));
  }

  /**
   * Check permissions
   */
  public function check_permissions(): bool {
    return current_user_can('edit_theme_options');
  }

  /**
   * Get all fonts
   */
  public function get_fonts($request): WP_Error|WP_REST_Response|WP_HTTP_Response {
    $fonts = $this->manager->get_fonts();
    return rest_ensure_response($fonts);
  }

  /**
   * Get font names only (for dropdowns)
   */
  public function get_font_names(): WP_Error|WP_REST_Response|WP_HTTP_Response {
    $manager = ThemePlus_Custom_Fonts_Manager::instance();
    $fonts = $manager->get_fonts();

    $names = [];
    foreach ($fonts as $font) {
      // Validate that font file still exists
      if (isset($font['files']['regular'])) {
        $file_id = $font['files']['regular'];
        $file_url = wp_get_attachment_url($file_id);

        // Only include if file exists
        if ($file_url) {
          $names[] = $font['name'];
        }
      }
    }

    return rest_ensure_response($names);
  }

  /**
   * Add font
   */
  public function add_font($request): WP_Error|WP_REST_Response|WP_HTTP_Response {
    $data = array(
      'name'  => $request->get_param('name'),
      'files' => $request->get_param('files'),
    );

    $result = $this->manager->add_font($data);

    if (is_wp_error($result)) {
      return new WP_Error(
        $result->get_error_code(),
        $result->get_error_message(),
        array('status' => 400)
      );
    }

    return rest_ensure_response(array(
      'success' => true,
      'id'      => $result,
      'message' => __('Font added successfully', 'themeplus'),
    ));
  }

  /**
   * Update font
   */
  public function update_font($request): WP_Error|WP_REST_Response|WP_HTTP_Response {
    $id = $request->get_param('id');
    $data = $request->get_params();

    $result = $this->manager->update_font($id, $data);

    if (is_wp_error($result)) {
      return new WP_Error(
        $result->get_error_code(),
        $result->get_error_message(),
        array('status' => 400)
      );
    }

    return rest_ensure_response(array(
      'success' => true,
      'message' => __('Font updated successfully', 'themeplus'),
    ));
  }

  /**
   * Delete font
   */
  public function delete_font($request): WP_Error|WP_REST_Response|WP_HTTP_Response {
    $id = $request->get_param('id');

    $result = $this->manager->delete_font($id);

    if (is_wp_error($result)) {
      return new WP_Error(
        $result->get_error_code(),
        $result->get_error_message(),
        array('status' => 400)
      );
    }

    return rest_ensure_response(array(
      'success' => true,
      'message' => __('Font deleted successfully', 'themeplus'),
    ));
  }
}

// Initialize
new ThemePlus_Custom_Fonts_API();