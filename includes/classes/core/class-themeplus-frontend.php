<?php
/**
 * ThemePlus Frontend
 * Handles frontend asset enqueuing
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

class ThemePlus_Frontend {

  /**
   * System/standard fonts — never enqueued
   */
  private static array $system_fonts = [
    'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
    'Georgia', 'Helvetica', 'Impact', 'Lucida Console',
    'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana',
  ];

  /**
   * Initialize frontend hooks
   */
  public static function init(): void {
    add_action('wp_enqueue_scripts', [self::class, 'enqueue_google_fonts']);
  }

  /**
   * Auto-enqueue Google Fonts from all typography fields
   */
  public static function enqueue_google_fonts(): void {
    $options = ThemePlus_Settings::get_all_options();
    $all_fields = ThemePlus_Config::get_all_fields();
    $font_map = [];

    // Get custom font names to exclude
    $custom_font_names = array_map(
      'strtolower',
      ThemePlus_Custom_Fonts_Manager::instance()->get_font_names()
    );

    foreach ($all_fields as $field) {
      if ($field['type'] !== 'typography')
        continue;

      $value = $options[$field['id']] ?? [];
      if (empty($value['font-family']))
        continue;

      $family = $value['font-family'];

      // Skip system fonts
      if (in_array($family, self::$system_fonts, true))
        continue;

      // Skip custom uploaded fonts
      if (in_array(strtolower($family), $custom_font_names, true))
        continue;

      $weight = $value['font-weight'] ?? '400';
      $subsets = $value['subsets'] ?? ['latin'];

      if (!isset($font_map[$family])) {
        $font_map[$family] = ['weights' => [], 'subsets' => []];
      }

      $font_map[$family]['weights'][] = $weight;
      $font_map[$family]['subsets'] = array_unique(
        array_merge($font_map[$family]['subsets'], (array)$subsets)
      );
    }

    if (empty($font_map))
      return;

    wp_enqueue_style(
      'themeplus-google-fonts',
      self::build_google_fonts_url($font_map),
      [],
      null
    );
  }

  /**
   * Build Google Fonts URL from font map
   */
  private static function build_google_fonts_url(array $font_map): string {
    $families = [];

    foreach ($font_map as $family => $data) {
      // Deduplicate and sort weights
      $weights = array_values(
        array_unique(
          array_merge(
            $data['weights'],
            ['400', '700'] // always include these
          )
        )
      );
      sort($weights);

      $families[] = 'family=' . urlencode($family)
        . ':wght@' . implode(';', $weights);
    }

    return 'https://fonts.googleapis.com/css2?'
      . implode('&', $families)
      . '&display=swap';
  }

}