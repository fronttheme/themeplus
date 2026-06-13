<?php
/**
 * ThemePlus Sanitizer Class
 *
 * Sanitizes the full options array against the registered field config:
 * unknown keys are dropped, every value is sanitized by its field type,
 * repeater and group fields are sanitized recursively.
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Sanitizer Class
 */
class ThemePlus_Sanitizer {

  /**
   * Field types that store no value.
   */
  const VALUELESS_TYPES = ['info', 'section', 'raw'];

  /**
   * Sanitize a full options array against the registered fields.
   *
   * @param array $raw Raw options (from REST, import, or reset).
   * @return array Sanitized options — unknown keys removed.
   */
  public static function sanitize_options(array $raw): array {
    $fields = ThemePlus_Config::get_all_fields();
    $clean  = [];

    foreach ($fields as $field_id => $field) {
      $type = $field['type'] ?? 'text';

      if (in_array($type, self::VALUELESS_TYPES, true)) {
        continue;
      }

      if (!array_key_exists($field_id, $raw)) {
        continue;
      }

      $clean[$field_id] = self::sanitize_field($raw[$field_id], $field);
    }

    /**
     * Filter the sanitized options before they are saved.
     *
     * @param array $clean Sanitized options.
     * @param array $raw Raw input options.
     */
    return apply_filters('themeplus/sanitized_options', $clean, $raw);
  }

  /**
   * Sanitize a single field value by its type.
   *
   * @param mixed $value Raw value.
   * @param array $field Field configuration.
   * @return mixed
   */
  public static function sanitize_field(mixed $value, array $field): mixed {
    $type = $field['type'] ?? 'text';

    switch ($type) {

      // ---- Scalars --------------------------------------------------
      case 'text':
      case 'shortcode':
        return sanitize_text_field((string)$value);

      case 'textarea':
        return sanitize_textarea_field((string)$value);

      case 'number':
      case 'spinner':
      case 'slider':
        return self::sanitize_number($value, $field);

      case 'toggle':
      case 'switch':
        return rest_sanitize_boolean($value);

      case 'select':
      case 'radio':
      case 'button_set':
      case 'select_image':
        return self::sanitize_choice($value, $field);

      case 'checkbox':
        return self::sanitize_checkbox($value, $field);

      case 'color':
        return self::sanitize_color((string)$value);

      case 'gradient_picker':
        return self::sanitize_gradient((string)$value);

      case 'icon':
        return self::sanitize_icon((string)$value);

      case 'date_picker':
        return self::sanitize_date((string)$value);

      case 'code_editor':
        return self::sanitize_code((string)$value, $field);

      // ---- Structured arrays ----------------------------------------
      case 'image':
        return self::sanitize_image($value);

      case 'gallery':
        return self::sanitize_gallery($value);

      case 'typography':
        return self::sanitize_typography($value);

      case 'dimensions':
        return self::sanitize_dimensions($value);

      case 'spacing':
        return self::sanitize_spacing($value);

      case 'border':
        return self::sanitize_border($value);

      case 'background':
        return self::sanitize_background($value);

      case 'link':
        return self::sanitize_link($value);

      case 'social_media':
        return self::sanitize_social($value);

      // ---- Nested fields --------------------------------------------
      case 'repeater':
        return self::sanitize_repeater($value, $field);

      case 'group':
        return self::sanitize_group($value, $field);

      default:
        /**
         * Sanitize an unknown/custom field type.
         *
         * @param mixed $sanitized Default-sanitized value.
         * @param mixed $value Raw value.
         * @param array $field Field configuration.
         */
        $fallback = is_array($value)
          ? map_deep($value, 'sanitize_text_field')
          : sanitize_text_field((string)$value);

        return apply_filters("themeplus/sanitize/{$type}", $fallback, $value, $field);
    }
  }

  // ==================================================================
  // Type sanitizers
  // ==================================================================

  /**
   * Numbers: cast by step, clamp to min/max when configured.
   */
  private static function sanitize_number(mixed $value, array $field): float|int {
    $step   = $field['step'] ?? 1;
    $number = (is_numeric($step) && (float)$step !== floor((float)$step))
      ? (float)$value
      : (int)$value;

    if (isset($field['min']) && is_numeric($field['min'])) {
      $number = max($number, $field['min'] + 0);
    }
    if (isset($field['max']) && is_numeric($field['max'])) {
      $number = min($number, $field['max'] + 0);
    }

    return $number;
  }

  /**
   * Single choice: must be one of the configured option values.
   */
  private static function sanitize_choice(mixed $value, array $field): string {
    $allowed = self::extract_option_values($field['options'] ?? []);
    $value   = (string)$value;

    if ($allowed && !in_array($value, $allowed, true)) {
      return (string)($field['default'] ?? ($allowed[0] ?? ''));
    }

    return sanitize_text_field($value);
  }

  /**
   * Checkbox: array of values, each must be a configured option.
   */
  private static function sanitize_checkbox(mixed $value, array $field): array {
    if (!is_array($value)) {
      return [];
    }

    $allowed = self::extract_option_values($field['options'] ?? []);
    $value   = array_map(static fn($v) => sanitize_text_field((string)$v), $value);

    if ($allowed) {
      $value = array_values(array_intersect($value, $allowed));
    }

    return $value;
  }

  /**
   * Color: hex via core, or a strict rgb()/rgba() pattern.
   */
  private static function sanitize_color(string $value): string {
    $hex = sanitize_hex_color($value);
    if ($hex) {
      return $hex;
    }

    if (preg_match('/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/i', $value)) {
      return $value;
    }

    return '';
  }

  /**
   * Gradient: a single CSS gradient function, no dangerous characters.
   */
  private static function sanitize_gradient(string $value): string {
    $value = trim($value);

    if (preg_match('/^(linear|radial|conic)-gradient\([^;{}<>"\']*\)$/i', $value)) {
      return $value;
    }

    return '';
  }

  /**
   * Icon: FontAwesome class string — letters, digits, spaces, hyphens.
   */
  private static function sanitize_icon(string $value): string {
    $value = trim(preg_replace('/[^a-z0-9 \-]/i', '', $value) ?? '');
    return sanitize_text_field($value);
  }

  /**
   * Date: Y-m-d, optionally with T-time (date_picker showTime).
   */
  private static function sanitize_date(string $value): string {
    if (preg_match('/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/', $value)) {
      return $value;
    }
    return '';
  }

  /**
   * Code editor: CSS gets tags stripped; other modes are stored as-is
   * (capability-gated input; themes are responsible for output context).
   */
  private static function sanitize_code(string $value, array $field): string {
    $mode = $field['mode'] ?? 'css';

    if ('css' === $mode) {
      return wp_strip_all_tags($value);
    }

    /**
     * Filter sanitization for non-CSS code editor values.
     *
     * @param string $value Raw code.
     * @param string $mode Editor mode (javascript, html, php, json).
     */
    return apply_filters('themeplus/sanitize_code', $value, $mode);
  }

  /**
   * Image: { id, url, width, height, alt, title } — {} when removed.
   */
  private static function sanitize_image(mixed $value): array {
    if (!is_array($value) || empty($value)) {
      return [];
    }

    return [
      'id'     => absint($value['id'] ?? 0),
      'url'    => esc_url_raw((string)($value['url'] ?? '')),
      'width'  => absint($value['width'] ?? 0),
      'height' => absint($value['height'] ?? 0),
      'alt'    => sanitize_text_field((string)($value['alt'] ?? '')),
      'title'  => sanitize_text_field((string)($value['title'] ?? '')),
    ];
  }

  /**
   * Gallery: array of { id, url, alt }.
   */
  private static function sanitize_gallery(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $clean = [];
    foreach ($value as $item) {
      if (!is_array($item)) {
        continue;
      }
      $clean[] = [
        'id'  => absint($item['id'] ?? 0),
        'url' => esc_url_raw((string)($item['url'] ?? '')),
        'alt' => sanitize_text_field((string)($item['alt'] ?? '')),
      ];
    }

    return $clean;
  }

  /**
   * Typography: known keys only, each validated.
   */
  private static function sanitize_typography(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $weights    = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
    $transforms = ['none', 'uppercase', 'lowercase', 'capitalize'];
    $styles     = ['normal', 'italic'];

    $clean = [];

    if (isset($value['font-family'])) {
      $clean['font-family'] = sanitize_text_field((string)$value['font-family']);
    }
    foreach (['font-size', 'line-height', 'letter-spacing'] as $numeric) {
      if (isset($value[$numeric]) && preg_match('/^-?[0-9.]+$/', (string)$value[$numeric])) {
        $clean[$numeric] = (string)$value[$numeric];
      }
    }
    if (isset($value['font-weight']) && in_array((string)$value['font-weight'], $weights, true)) {
      $clean['font-weight'] = (string)$value['font-weight'];
    }
    if (isset($value['font-style']) && in_array((string)$value['font-style'], $styles, true)) {
      $clean['font-style'] = (string)$value['font-style'];
    }
    if (isset($value['text-transform']) && in_array((string)$value['text-transform'], $transforms, true)) {
      $clean['text-transform'] = (string)$value['text-transform'];
    }
    if (isset($value['subsets']) && is_array($value['subsets'])) {
      $clean['subsets'] = array_values(array_map('sanitize_key', $value['subsets']));
    }

    return $clean;
  }

  /**
   * Dimensions: { width, height, unit }.
   */
  private static function sanitize_dimensions(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    return [
      'width'  => self::sanitize_css_number($value['width'] ?? ''),
      'height' => self::sanitize_css_number($value['height'] ?? ''),
      'unit'   => self::sanitize_unit((string)($value['unit'] ?? 'px')),
    ];
  }

  /**
   * Spacing: { top, right, bottom, left, unit }.
   */
  private static function sanitize_spacing(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $clean = ['unit' => self::sanitize_unit((string)($value['unit'] ?? 'px'))];
    foreach (['top', 'right', 'bottom', 'left'] as $side) {
      $clean[$side] = is_numeric($value[$side] ?? null) ? $value[$side] + 0 : 0;
    }

    return $clean;
  }

  /**
   * Border: { width, style, color, radius }.
   */
  private static function sanitize_border(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $styles = ['solid', 'dashed', 'dotted', 'double'];
    $style  = (string)($value['style'] ?? 'solid');

    return [
      'width'  => absint($value['width'] ?? 0),
      'style'  => in_array($style, $styles, true) ? $style : 'solid',
      'color'  => self::sanitize_color((string)($value['color'] ?? '')),
      'radius' => absint($value['radius'] ?? 0),
    ];
  }

  /**
   * Background: { mode, color, image, position, size, repeat, attachment, gradient }.
   */
  private static function sanitize_background(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $modes       = ['color', 'image', 'gradient'];
    $sizes       = ['cover', 'contain', 'auto'];
    $repeats     = ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'];
    $attachments = ['scroll', 'fixed'];
    $positions   = [
      'left top', 'left center', 'left bottom',
      'center top', 'center center', 'center bottom',
      'right top', 'right center', 'right bottom',
    ];

    $mode       = (string)($value['mode'] ?? 'color');
    $position   = (string)($value['position'] ?? 'center center');
    $size       = (string)($value['size'] ?? 'cover');
    $repeat     = (string)($value['repeat'] ?? 'no-repeat');
    $attachment = (string)($value['attachment'] ?? 'scroll');

    // Image sub-value may be a URL string or an ImageField object.
    $image = $value['image'] ?? '';
    $image = is_array($image)
      ? self::sanitize_image($image)
      : esc_url_raw((string)$image);

    return [
      'mode'       => in_array($mode, $modes, true) ? $mode : 'color',
      'color'      => self::sanitize_color((string)($value['color'] ?? '')),
      'image'      => $image,
      'position'   => in_array($position, $positions, true) ? $position : 'center center',
      'size'       => in_array($size, $sizes, true) ? $size : 'cover',
      'repeat'     => in_array($repeat, $repeats, true) ? $repeat : 'no-repeat',
      'attachment' => in_array($attachment, $attachments, true) ? $attachment : 'scroll',
      'gradient'   => self::sanitize_gradient((string)($value['gradient'] ?? '')),
    ];
  }

  /**
   * Link: { url, text, target, rel }.
   */
  private static function sanitize_link(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $target = (string)($value['target'] ?? '_self');

    return [
      'url'    => esc_url_raw((string)($value['url'] ?? '')),
      'text'   => sanitize_text_field((string)($value['text'] ?? '')),
      'target' => in_array($target, ['_self', '_blank'], true) ? $target : '_self',
      'rel'    => trim(preg_replace('/[^a-z ]/', '', strtolower((string)($value['rel'] ?? ''))) ?? ''),
    ];
  }

  /**
   * Social media: array of { platform, url }.
   */
  private static function sanitize_social(mixed $value): array {
    if (!is_array($value)) {
      return [];
    }

    $clean = [];
    foreach ($value as $row) {
      if (!is_array($row)) {
        continue;
      }
      $url     = esc_url_raw((string)($row['url'] ?? ''));
      $clean[] = [
        'platform' => sanitize_key((string)($row['platform'] ?? '')),
        'url'      => $url,
      ];
    }

    return $clean;
  }

  /**
   * Repeater: array of rows, each row sanitized against the sub-fields.
   */
  private static function sanitize_repeater(mixed $value, array $field): array {
    if (!is_array($value)) {
      return [];
    }

    $sub_fields = $field['fields'] ?? [];
    $max        = isset($field['max']) ? (int)$field['max'] : 0;

    $clean = [];
    foreach (array_values($value) as $i => $row) {
      if ($max > 0 && $i >= $max) {
        break;
      }
      $clean[] = self::sanitize_row((array)$row, $sub_fields);
    }

    return $clean;
  }

  /**
   * Group: one row sanitized against the sub-fields.
   */
  private static function sanitize_group(mixed $value, array $field): array {
    if (!is_array($value)) {
      return [];
    }

    return self::sanitize_row($value, $field['fields'] ?? []);
  }

  /**
   * Sanitize one row keyed by sub-field ids.
   */
  private static function sanitize_row(array $row, array $sub_fields): array {
    $clean = [];

    foreach ($sub_fields as $sub_field) {
      $sub_id   = $sub_field['id'] ?? '';
      $sub_type = $sub_field['type'] ?? 'text';

      if ('' === $sub_id || in_array($sub_type, self::VALUELESS_TYPES, true)) {
        continue;
      }
      if (!array_key_exists($sub_id, $row)) {
        continue;
      }

      $clean[$sub_id] = self::sanitize_field($row[$sub_id], $sub_field);
    }

    return $clean;
  }

  // ==================================================================
  // Helpers
  // ==================================================================

  /**
   * Extract the allowed values from any supported options format:
   * 'key' => 'Label' map, array of scalars, array of { value, label } rows.
   */
  private static function extract_option_values(mixed $options): array {
    if (!is_array($options)) {
      return [];
    }

    $values = [];
    foreach ($options as $key => $option) {
      if (is_array($option) && isset($option['value'])) {
        $values[] = (string)$option['value'];
      } elseif (is_string($key) && !is_array($option)) {
        $values[] = $key;
      } elseif (is_scalar($option)) {
        $values[] = (string)$option;
      }
    }

    return $values;
  }

  /**
   * Numeric string or empty (dimensions inputs allow '').
   */
  private static function sanitize_css_number(mixed $value): string {
    $value = (string)$value;
    return preg_match('/^-?[0-9.]+$/', $value) ? $value : '';
  }

  /**
   * CSS unit whitelist.
   */
  private static function sanitize_unit(string $unit): string {
    return in_array($unit, ['px', 'em', 'rem', '%', 'vh', 'vw'], true) ? $unit : 'px';
  }
}