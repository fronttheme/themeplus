<?php
/**
 * ThemePlus Custom Fonts Frontend
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH'))
  exit;

class ThemePlus_Custom_Fonts_Frontend {

  private ThemePlus_Custom_Fonts_Manager $manager;
  private bool $fonts_css_output = false;

  public function __construct() {
    $this->manager = ThemePlus_Custom_Fonts_Manager::instance();

    // Frontend
    add_action('wp_head', [$this, 'output_custom_fonts_css'], 1);
    add_action('wp_head', [$this, 'output_gutenberg_font_classes'], 2);

    // Admin - only for non-block-editor pages
    add_action('admin_head', [$this, 'output_custom_fonts_css'], 1);

    // Block editor
    add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_fonts']);

    // Customizer
    add_action('customize_preview_init', [$this, 'customizer_preview']);

    // Elementor
    add_action('elementor/editor/after_enqueue_styles', [$this, 'output_custom_fonts_css']);
    add_filter('elementor/fonts/groups', [$this, 'add_to_elementor']);

    // Gutenberg
    add_filter('block_editor_settings_all', [$this, 'add_to_gutenberg'], 10, 2);
  }

  /**
   * Output Gutenberg font family CSS classes for frontend only
   */
  public function output_gutenberg_font_classes(): void {
    // Only output on frontend, not in admin
    if (is_admin()) {
      return;
    }

    $valid_fonts = $this->get_valid_fonts();

    if (empty($valid_fonts)) {
      return;
    }

    $css = '';
    foreach ($valid_fonts as $font) {
      $slug = sanitize_title($font);
      $family = str_contains($font, ' ')
        ? '"' . $font . '", sans-serif'
        : $font . ', sans-serif';

      $css .= '.has-' . $slug . '-font-family { font-family: ' . $family . '; }' . "\n";
    }

    if (empty($css)) {
      return;
    }

    echo '<style id="themeplus-gutenberg-font-classes">' . "\n" . $css . '</style>' . "\n";
  }

  /**
   * Enqueue custom fonts in block editor properly
   * Only output once and with correct priority
   */
  public function enqueue_block_editor_fonts(): void {
    // Only run in block editor
    if (!$this->is_block_editor()) {
      return;
    }

    $css = get_option('themeplus_custom_fonts_css', '');

    if (empty($css)) {
      $css = $this->manager->regenerate_css();
    }

    if (empty($css)) {
      return;
    }

    // Use wp_add_inline_style with an existing core style to ensure it loads in iframe
    wp_enqueue_style('wp-edit-blocks');
    wp_add_inline_style('wp-edit-blocks', $css);

    // Add the font classes with higher specificity
    $font_classes_css = $this->get_gutenberg_font_classes_css();
    if (!empty($font_classes_css)) {
      wp_add_inline_style('wp-edit-blocks', $font_classes_css);
    }
  }

  /**
   * Get Gutenberg font classes CSS
   */
  private function get_gutenberg_font_classes_css(): string {
    $valid_fonts = $this->get_valid_fonts();

    if (empty($valid_fonts)) {
      return '';
    }

    $css = '';
    foreach ($valid_fonts as $font) {
      $slug = sanitize_title($font);
      $family = str_contains($font, ' ')
        ? '"' . $font . '", sans-serif'
        : $font . ', sans-serif';

      // Target the editor content specifically
      $css .= '.editor-styles-wrapper .has-' . $slug . '-font-family,' . "\n";
      $css .= '.block-editor-block-list__block.has-' . $slug . '-font-family,' . "\n";
      $css .= '.wp-block.has-' . $slug . '-font-family {' . "\n";
      $css .= '    font-family: ' . $family . ' !important;' . "\n";
      $css .= '}' . "\n\n";
    }

    return $css;
  }

  /**
   * Check if we're in block editor
   */
  private function is_block_editor(): bool {
    global $pagenow;
    return in_array($pagenow, ['post.php', 'post-new.php', 'site-editor.php']) ||
      (defined('REST_REQUEST') && REST_REQUEST && isset($_GET['context']) && $_GET['context'] === 'edit');
  }

  /**
   * Remove duplicate output methods and simplify
   */
  public function output_custom_fonts_css(): void {
    if ($this->fonts_css_output) {
      return;
    }
    $this->fonts_css_output = true;

    // Don't output in block editor iframe (handled by enqueue_block_editor_fonts)
    if ($this->is_block_editor()) {
      return;
    }

    $css = get_option('themeplus_custom_fonts_css', '');

    if (empty($css)) {
      $css = $this->manager->regenerate_css();
    }

    if (!empty($css)) {
      echo '<style id="themeplus-custom-fonts">' . "\n";
      echo $css;
      echo '</style>' . "\n";
    }
  }

  /**
   * Customizer preview
   */
  public function customizer_preview(): void {
    add_action('wp_head', [$this, 'output_custom_fonts_css'], 1);
  }

  /**
   * Add custom fonts to Elementor
   */
  public function add_to_elementor($font_groups) {
    $valid_fonts = $this->get_valid_fonts();

    if (empty($valid_fonts)) {
      return $font_groups;
    }

    // Add custom fonts group at TOP
    $new_font_groups = [
      'themeplus_custom' => __('Custom Fonts', 'themeplus'),
    ];
    $new_font_groups = array_merge($new_font_groups, $font_groups);

    // Add fonts to Elementor
    add_filter('elementor/fonts/additional_fonts', function ($additional_fonts) use ($valid_fonts) {
      foreach ($valid_fonts as $font) {
        $additional_fonts[$font] = 'themeplus_custom';
      }
      return $additional_fonts;
    });

    return $new_font_groups;
  }

  /**
   * Add custom fonts to Gutenberg (Block Editor)
   */
  public function add_to_gutenberg($settings, $context) {
    $valid_fonts = $this->get_valid_fonts();

    if (empty($valid_fonts)) {
      return $settings;
    }

    // Initialize settings
    if (!isset($settings['__experimentalFeatures']['typography']['fontFamilies']['theme'])) {
      $settings['__experimentalFeatures']['typography']['fontFamilies']['theme'] = [];
    }

    // Add fonts
    foreach ($valid_fonts as $font) {
      $slug = sanitize_title($font);
      $font_family = str_contains($font, ' ')
        ? sprintf('"%s", sans-serif', $font)
        : sprintf('%s, sans-serif', $font);

      // Check if font already exists to avoid duplicates
      $exists = false;
      foreach ($settings['__experimentalFeatures']['typography']['fontFamilies']['theme'] as $existing) {
        if ($existing['slug'] === $slug) {
          $exists = true;
          break;
        }
      }

      if (!$exists) {
        $settings['__experimentalFeatures']['typography']['fontFamilies']['theme'][] = [
          'fontFamily' => $font_family,
          'name'       => $font,
          'slug'       => $slug,
        ];
      }
    }

    return $settings;
  }

  /**
   * Output custom fonts CSS directly into editor iframe
   */
  public function output_editor_fonts_css(): void {
    global $pagenow;

    // Only run in block editor
    if (!in_array($pagenow, ['post.php', 'post-new.php', 'site-editor.php'])) {
      return;
    }

    $css = get_option('themeplus_custom_fonts_css', '');
    if (empty($css)) {
      $css = $this->manager->regenerate_css();
    }

    if (!empty($css)) {
      // Output both the font-face rules and the class selectors
      echo '<style id="themeplus-editor-fonts">';
      echo $css;

      // Also add the class selectors with !important
      $valid_fonts = $this->get_valid_fonts();
      if (!empty($valid_fonts)) {
        foreach ($valid_fonts as $font) {
          $slug = sanitize_title($font);
          $family = str_contains($font, ' ')
            ? '"' . $font . '", sans-serif'
            : $font . ', sans-serif';
          echo '.has-' . $slug . '-font-family { font-family: ' . $family . ' !important; }';
        }
      }
      echo '</style>';
    }
  }

  /**
   * Get validated custom fonts
   *
   * Allow developers to integrate custom fonts with other builders
   *
   *  Usage example in theme's functions.php:
   *  add_filter('themeplus/custom_fonts_list', function($fonts) {
   *      // Register with Kirki, Divi, etc.
   *      return $fonts;
   *  });
   *
   * @return array Array of valid font names
   */
  private function get_valid_fonts(): array {
    $fonts = $this->manager->get_fonts();

    if (empty($fonts)) {
      return [];
    }

    // Validate fonts
    $valid_fonts = [];
    foreach ($fonts as $font) {
      if (isset($font['files']['regular'])) {
        $file_url = wp_get_attachment_url($font['files']['regular']);
        if ($file_url) {
          $valid_fonts[] = $font['name'];
        }
      }
    }

    return apply_filters('themeplus/custom_fonts_list', $valid_fonts);
  }

}

// Initialize
new ThemePlus_Custom_Fonts_Frontend();