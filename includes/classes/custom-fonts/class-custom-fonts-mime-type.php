<?php
/**
 * ThemePlus Font MIME Type Handler
 *
 * Handles font file MIME types, validation, and security
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

class ThemePlus_Custom_Fonts_MimeType {

  /**
   * Instance
   *
   * @var self|null
   */
  private static ?self $instance = null;

  /**
   * Allowed font file types
   */
  const ALLOWED_TYPES = ['woff', 'woff2', 'ttf', 'otf', 'eot'];

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
    // Add font MIME types
    add_filter('upload_mimes', [$this, 'add_font_mime_types']);

    // MIME type check for fonts
    add_filter('wp_check_filetype_and_ext', [$this, 'check_font_filetype'], 10, 5);

    // Sanitize font uploads
    add_filter('wp_handle_upload_prefilter', [$this, 'sanitize_font_upload']);

    // Add CORS headers for fonts
    add_action('send_headers', [$this, 'add_cors_headers']);
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
   * Add font MIME types to WordPress
   */
  public function add_font_mime_types($mimes): array {
    $mimes['woff'] = 'font/woff';
    $mimes['woff2'] = 'font/woff2';
    $mimes['ttf'] = 'font/ttf';
    $mimes['otf'] = 'font/otf';
    $mimes['eot'] = 'application/vnd.ms-fontobject';

    return $mimes;
  }

  /**
   * Check and validate font file type
   */
  public function check_font_filetype($data, $file, $filename, $mimes, $real_mime = null): array {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);

    if (!in_array($ext, self::ALLOWED_TYPES)) {
      return $data;
    }

    // Verify it's actually a font file
    $real_ext = $this->verify_font_file($file);

    if (!$real_ext) {
      return $data;
    }

    $data['ext'] = $real_ext;
    $data['type'] = $this->get_mime_type($real_ext);

    return $data;
  }

  /**
   * Verify font file is legitimate by checking magic bytes
   */
  private function verify_font_file($file): false|string {
    $ext = pathinfo($file, PATHINFO_EXTENSION);

    if (!in_array($ext, self::ALLOWED_TYPES)) {
      return false;
    }

    // Read file header to verify format
    $handle = fopen($file, 'rb');
    if (!$handle) {
      return false;
    }

    $header = fread($handle, 4);
    fclose($handle);

    // Check magic bytes for font formats
    $magic_bytes = [
      'woff'  => "\x77\x4f\x46\x46", // wOFF
      'woff2' => "\x77\x4f\x46\x32", // wOF2
      'ttf'   => "\x00\x01\x00\x00", // TrueType
      'otf'   => "\x4f\x54\x54\x4f", // OTTO
    ];

    foreach ($magic_bytes as $type => $bytes) {
      if (str_starts_with($header, $bytes)) {
        return $type;
      }
    }

    return $ext; // Allow if extension matches
  }

  /**
   * Get MIME type for font extension
   */
  private function get_mime_type($ext): string {
    $types = [
      'woff'  => 'font/woff',
      'woff2' => 'font/woff2',
      'ttf'   => 'font/ttf',
      'otf'   => 'font/otf',
      'eot'   => 'application/vnd.ms-fontobject',
    ];

    return $types[$ext] ?? 'application/octet-stream';
  }

  /**
   * Sanitize and validate font upload
   */
  public function sanitize_font_upload($file): array {
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

    // Only process font files
    if (!in_array($ext, self::ALLOWED_TYPES)) {
      return $file;
    }

    // Security: Only allow for users with proper permissions
    if (!current_user_can('edit_theme_options')) {
      $file['error'] = __('You do not have permission to upload font files.', 'themeplus');
      return $file;
    }

    // Sanitize filename
    $file['name'] = sanitize_file_name($file['name']);

    return $file;
  }

  /**
   * Add CORS headers for font files
   */
  public function add_cors_headers(): void {
    if (isset($_SERVER['REQUEST_URI'])) {
      $request_uri = $_SERVER['REQUEST_URI'];
      if (preg_match('/\.(woff|woff2|ttf|otf|eot)(\?.*)?$/i', $request_uri)) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Headers: Content-Type');
      }
    }
  }
}

// Initialize
ThemePlus_Custom_Fonts_MimeType::instance();