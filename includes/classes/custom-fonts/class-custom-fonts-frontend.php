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

  public function __construct() {
    $this->manager = ThemePlus_Custom_Fonts_Manager::instance();

    // Frontend
    add_action('wp_head', array($this, 'output_custom_fonts_css'), 1);

    // Admin (for Gutenberg editor)
    add_action('admin_head', array($this, 'output_custom_fonts_css'), 1);
    add_action('enqueue_block_editor_assets', array($this, 'output_custom_fonts_css'));

    // Customizer
    add_action('customize_preview_init', array($this, 'customizer_preview'));

    // Elementor
    add_action('elementor/editor/after_enqueue_styles', array($this, 'output_custom_fonts_css'));
    add_filter('elementor/fonts/groups', array($this, 'add_to_elementor'));

    // Gutenberg
    add_filter('block_editor_settings_all', array($this, 'add_to_gutenberg'), 10, 2);
  }

  /**
   * Output custom fonts CSS
   */
  public function output_custom_fonts_css(): void {
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
    add_action('wp_footer', array($this, 'output_custom_fonts_css'), 1);
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
    $new_font_groups = array(
      'themeplus_custom' => __('Custom Fonts', 'themeplus'),
    );
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
      $settings['__experimentalFeatures']['typography']['fontFamilies']['theme'] = array();
    }

    // Add fonts (ONCE, not twice!)
    foreach ($valid_fonts as $font) {
      $font_family = str_contains($font, ' ')
        ? sprintf('"%s", sans-serif', $font)
        : sprintf('%s, sans-serif', $font);

      $settings['__experimentalFeatures']['typography']['fontFamilies']['theme'][] = array(
        'fontFamily' => $font_family,
        'name'       => $font,
        'slug'       => sanitize_title($font),
      );
    }

    return $settings;
  }

  /**
   * Get validated custom fonts
   *
   * @return array Array of valid font names
   */
  private function get_valid_fonts(): array {
    $fonts = $this->manager->get_fonts();

    if (empty($fonts)) {
      return array();
    }

    // Validate fonts
    $valid_fonts = array();
    foreach ($fonts as $font) {
      if (isset($font['files']['regular'])) {
        $file_url = wp_get_attachment_url($font['files']['regular']);
        if ($file_url) {
          $valid_fonts[] = $font['name'];
        }
      }
    }

    return $valid_fonts;
  }

}

// Initialize
new ThemePlus_Custom_Fonts_Frontend();