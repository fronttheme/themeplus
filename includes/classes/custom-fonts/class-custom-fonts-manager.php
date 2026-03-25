<?php
/**
 * ThemePlus Custom Fonts Manager
 *
 * Handles custom font storage and management
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

class ThemePlus_Custom_Fonts_Manager {

  /**
   * Instance
   *
   * @var self|null
   */
  private static ?self $instance = null;

  /**
   * Option name for storing custom fonts
   */
  const OPTION_NAME = 'themeplus_custom_fonts';

  /**
   * Allowed font file types
   */
  const ALLOWED_TYPES = ['woff', 'woff2'];

  /**
   * Get instance
   *
   * @return self
   */
  public static function instance(): self {
    if (is_null(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Constructor
   */
  private function __construct() {
  }

  /**
   * Prevent cloning
   */
  private function __clone() {
  }

  /**
   * Prevent unserializing
   * @throws Exception
   */
  public function __wakeup() {
    throw new \Exception('Cannot unserialize singleton');
  }

  /**
   * Get all custom fonts
   */
  public function get_fonts(): array {
    $fonts = get_option(self::OPTION_NAME, []);
    return is_array($fonts) ? $fonts : [];
  }

  /**
   * Get single font by ID
   */
  public function get_font($id) {
    $fonts = $this->get_fonts();
    return $fonts[$id] ?? null;
  }

  /**
   * Check if font name already exists
   */
  private function font_name_exists($name): bool {
    $fonts = $this->get_fonts();

    foreach ($fonts as $font) {
      if (strcasecmp($font['name'], $name) === 0) {
        return true;
      }
    }

    return false;
  }

  /**
   * Add custom font
   */
  public function add_font($data): WP_Error|string {
    // Validate data
    if (empty($data['name']) || empty($data['files'])) {
      return new WP_Error('invalid_data', __('Font name and files are required', 'themeplus'));
    }

    // Sanitize font name
    $data['name'] = sanitize_text_field($data['name']);

    // Check duplicate name
    if ($this->font_name_exists($data['name'])) {
      return new WP_Error('duplicate_name', __('A font with this name already exists', 'themeplus'));
    }

    // Validate files
    foreach ($data['files'] as $variant => $file) {
      if (!empty($file)) {
        $attachment_id = intval($file);
        $file_url = wp_get_attachment_url($attachment_id);

        if (!$file_url) {
          return new WP_Error('invalid_file', __('Invalid font file', 'themeplus'));
        }

        // Verify file type
        $file_path = get_attached_file($attachment_id);
        $ext = pathinfo($file_path, PATHINFO_EXTENSION);

        if (!in_array($ext, self::ALLOWED_TYPES)) {
          return new WP_Error('invalid_type', __('Invalid font file type', 'themeplus'));
        }
      }
    }

    // Get existing fonts
    $fonts = $this->get_fonts();

    // Generate unique ID
    $id = sanitize_title($data['name']) . '_' . time();

    // Add font
    $fonts[$id] = [
      'id'      => $id,
      'name'    => $data['name'],
      'files'   => $data['files'],
      'created' => current_time('mysql'),
    ];

    // Save
    update_option(self::OPTION_NAME, $fonts);

    // Regenerate CSS
    $this->regenerate_css();

    return $id;
  }

  /**
   * Update custom font
   */
  public function update_font($id, $data): true|WP_Error {
    $fonts = $this->get_fonts();

    if (!isset($fonts[$id])) {
      return new WP_Error('not_found', __('Font not found', 'themeplus'));
    }

    // Sanitize
    if (isset($data['name'])) {
      $data['name'] = sanitize_text_field($data['name']);
    }

    // Update
    $fonts[$id] = array_merge($fonts[$id], $data);
    $fonts[$id]['modified'] = current_time('mysql');

    // Save
    update_option(self::OPTION_NAME, $fonts);

    // Regenerate CSS
    $this->regenerate_css();

    return true;
  }

  /**
   * Delete custom font
   */
  public function delete_font($id): true|WP_Error {
    $fonts = $this->get_fonts();

    if (!isset($fonts[$id])) {
      return new WP_Error('not_found', __('Font not found', 'themeplus'));
    }

    // Remove font
    unset($fonts[$id]);

    // Save
    update_option(self::OPTION_NAME, $fonts);

    // Regenerate CSS
    $this->regenerate_css();

    return true;
  }

  /**
   * Get font names for dropdown
   */
  public function get_font_names(): array {
    $fonts = $this->get_fonts();
    $names = [];

    foreach ($fonts as $font) {
      $names[] = $font['name'];
    }

    return $names;
  }

  /**
   * Regenerate CSS file
   */
  public function regenerate_css(): string {
    $fonts = $this->get_fonts();
    $css = $this->generate_css($fonts);

    // Save to option for quick access
    update_option('themeplus_custom_fonts_css', $css);

    return $css;
  }

  /**
   * Generate CSS for custom fonts
   */
  private function generate_css($fonts): string {
    $css = "/* ThemePlus Custom Fonts */\n\n";

    foreach ($fonts as $font) {
      $css .= $this->generate_font_face($font);
    }

    return $css;
  }

  /**
   * Generate @font-face rule
   */
  private function generate_font_face($font): string {
    $css = "/* {$font['name']} */\n";

    $variants = [
      'regular'     => ['weight' => '400', 'style' => 'normal'],
      'italic'      => ['weight' => '400', 'style' => 'italic'],
      'bold'        => ['weight' => '700', 'style' => 'normal'],
      'bold_italic' => ['weight' => '700', 'style' => 'italic'],
    ];

    foreach ($variants as $variant => $props) {
      if (empty($font['files'][$variant])) {
        continue;
      }

      $attachment_id = intval($font['files'][$variant]);
      $file_url = wp_get_attachment_url($attachment_id);

      if (!$file_url) {
        continue;
      }

      $ext = pathinfo($file_url, PATHINFO_EXTENSION);
      $format = $this->get_font_format($ext);

      $css .= "@font-face {\n";
      $css .= "  font-family: '{$font['name']}';\n";
      $css .= "  src: url('{$file_url}') format('{$format}');\n";
      $css .= "  font-weight: {$props['weight']};\n";
      $css .= "  font-style: {$props['style']};\n";
      $css .= "  font-display: swap;\n";
      $css .= "}\n\n";
    }

    return $css;
  }

  /**
   * Get font format for CSS
   */
  private function get_font_format($ext): string {
    $formats = [
      'woff'  => 'woff',
      'woff2' => 'woff2',
      'ttf'   => 'truetype',
      'otf'   => 'opentype',
      'eot'   => 'embedded-opentype',
    ];

    return $formats[$ext] ?? 'truetype';
  }
}

// Initialize
ThemePlus_Custom_Fonts_Manager::instance();