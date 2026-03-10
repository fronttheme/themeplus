<?php
/**
 * ThemePlus Developer Panel
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

class ThemePlus_Dev_Panel {

  /**
   * Fields that don't need usage examples (visual only)
   */
  const VISUAL_ONLY_FIELDS = [
    'info',
    'section',
    'group',
    'raw',
  ];

  /**
   * Fields that return arrays
   */
  const ARRAY_FIELDS = [
    'repeater',
    'social_media',
    'gallery',
    'dimensions',
    'spacing',
    'border',
    'typography',
    'background',
  ];

  /**
   * Get all field metadata
   *
   * @return array
   */
  public static function get_field_metadata(): array {
    $sections = ThemePlus_Config::get_sections();
    $current_values = ThemePlus_Settings::get_all_options();
    $metadata = [];

    foreach ($sections as $section) {
      // Skip dev panel itself
      if ($section['id'] === 'developer-panel') {
        continue;
      }

      // Section fields
      foreach ($section['fields'] as $field) {
        $metadata[] = self::build_field_meta($field, $section, null, $current_values);
      }

      // Subsection fields
      foreach ($section['subsections'] as $subsection) {
        foreach ($subsection['fields'] as $field) {
          $metadata[] = self::build_field_meta($field, $section, $subsection, $current_values);
        }
      }
    }

    return $metadata;
  }

  /**
   * Build field metadata
   *
   * @param array $field Field config
   * @param array $section Section config
   * @param array|null $subsection Subsection config
   * @param array $current_values Current option values
   * @return array
   */
  /**
   * Build field metadata
   */
  private static function build_field_meta($field, $section, $subsection, $current_values): array {
    $field_id = $field['id'];
    $field_type = $field['type'];
    $current_value = $current_values[$field_id] ?? null;

    // Check if field needs usage examples
    $show_usage = !in_array($field_type, self::VISUAL_ONLY_FIELDS);

    // Get dependency info
    $dependency = null;
    if (!empty($field['required'])) {
      $required = $field['required'];

      // Format dependency for display
      if (is_array($required) && count($required) >= 3) {
        $dependency = [
          'field'    => $required[0],
          'operator' => $required[1],
          'value'    => $required[2],
        ];
      }
    } elseif (!empty($field['dependency'])) {
      $dependency = $field['dependency'];
    }

    // Generate usage examples based on field type
    $usage = $show_usage ? self::generate_usage_examples($field_id, $field_type, $field['default'] ?? null) : null;

    return [
      'id'               => $field_id,
      'type'             => $field_type,
      'title'            => $field['title'] ?? '',
      'subtitle'         => $field['subtitle'] ?? '',
      'default_value'    => $field['default'] ?? null,
      'current_value'    => $current_value,
      'value_type'       => self::get_value_type($current_value),
      'section_id'       => $section['id'],
      'section_title'    => $section['title'],
      'subsection_id'    => $subsection['id'] ?? null,
      'subsection_title' => $subsection['title'] ?? null,
      'required'         => $field['required'] ?? false,
      'dependency'       => $dependency,
      'show_usage'       => $show_usage,
      'usage'            => $usage,
    ];
  }

  /**
   * Get proper value type - for PHP context
   */
  private static function get_value_type($value): string {
    if (is_null($value)) {
      return 'null';
    }
    if (is_bool($value)) {
      return 'boolean';
    }
    if (is_string($value)) {
      return 'string';
    }
    if (is_int($value)) {
      return 'integer';
    }
    if (is_float($value)) {
      return 'float';
    }
    if (is_array($value)) {
      // In PHP, it's always an array (associative or indexed)
      return 'array';
    }
    return 'mixed';
  }

  /**
   * Generate usage examples based on field type
   */
  private static function generate_usage_examples($field_id, $field_type, $default_value): array {
    $is_array_field = in_array($field_type, self::ARRAY_FIELDS);

    // Fallback - just show the pattern!
    $default_hint = self::get_default_hint($default_value);

    $examples = [
      // Bulk Access
      'bulk'   => "// Get all options once (best for multiple fields)\n\$options = themeplus_get_option();\n\n// Access field\n\$value = \$options['{$field_id}'] ?? {$default_hint};",

      // Single field access
      'helper' => "themeplus_get_option('{$field_id}', {$default_hint})",

      // Direct access
      'direct' => "\$options = get_option('themeplus_options', []);\n\$value = \$options['{$field_id}'] ?? {$default_hint};",
    ];

    // Template usage
    if ($is_array_field) {
      $examples['template'] = self::get_array_field_template($field_id, $field_type);
    } else {
      $examples['template'] = "<?php echo themeplus_get_option('{$field_id}'); ?>";
    }

    return $examples;
  }

  /**
   * Get simple default hint
   */
  private static function get_default_hint($value): string {
    if (is_null($value)) {
      return 'null';
    }
    if (is_bool($value)) {
      return $value ? 'true' : 'false';
    }
    if (is_string($value)) {
      return "'" . addslashes($value) . "'";
    }
    if (is_numeric($value)) {
      return (string)$value;
    }
    if (is_array($value)) {
      // Just show the pattern, not the full array!
      if (empty($value)) {
        return '[]';
      }
      // Show hint instead of full array
      return '[/* default array */]';
    }
    return "''";
  }

  /**
   * Format default value for PHP code
   */
  private static function format_default_value($value): string {
    if (is_null($value)) {
      return 'null';
    }
    if (is_bool($value)) {
      return $value ? 'true' : 'false';
    }
    if (is_string($value)) {
      return "'" . addslashes($value) . "'";
    }
    if (is_numeric($value)) {
      return (string)$value;
    }
    if (is_array($value)) {
      // Use short array syntax [] instead of array()
      return self::export_array_short_syntax($value);
    }
    return "''";
  }

  /**
   * Export array
   */
  private static function export_array_short_syntax($array, $indent = 0): string {
    if (empty($array)) {
      return '[]';
    }

    $is_list = array_keys($array) === range(0, count($array) - 1);
    $indent_str = str_repeat('  ', $indent);
    $items = [];

    foreach ($array as $key => $value) {
      $item_indent = $indent_str . '  ';

      if ($is_list) {
        // Indexed array - no keys
        if (is_array($value)) {
          $items[] = $item_indent . self::export_array_short_syntax($value, $indent + 1);
        } else {
          $items[] = $item_indent . self::format_simple_value($value);
        }
      } else {
        // Associative array - with keys
        $formatted_key = is_string($key) ? "'" . addslashes($key) . "'" : $key;
        if (is_array($value)) {
          $items[] = $item_indent . $formatted_key . ' => ' . self::export_array_short_syntax($value, $indent + 1);
        } else {
          $items[] = $item_indent . $formatted_key . ' => ' . self::format_simple_value($value);
        }
      }
    }

    return "[\n" . implode(",\n", $items) . "\n" . $indent_str . ']';
  }

  /**
   * Format simple value
   */
  private static function format_simple_value($value): string {
    if (is_null($value)) {
      return 'null';
    }
    if (is_bool($value)) {
      return $value ? 'true' : 'false';
    }
    if (is_string($value)) {
      return "'" . addslashes($value) . "'";
    }
    if (is_numeric($value)) {
      return (string)$value;
    }
    return "''";
  }

  /**
   * Get template example for array fields
   *
   * @param string $field_id Field ID
   * @param string $field_type Field type
   * @return string
   */
  private static function get_array_field_template(string $field_id, string $field_type): string {
    return match ($field_type) {
      'repeater' => "<?php\n\$items = themeplus_get_option('{$field_id}', []);\nif (!empty(\$items)) {\n  foreach (\$items as \$item) {\n    echo \$item['field_name'];\n  }\n}\n?>",
      'social_media' => "<?php\n\$socials = themeplus_get_option('{$field_id}', []);\nif (!empty(\$socials)) {\n  foreach (\$socials as \$social) {\n    echo '<a href=\"' . esc_url(\$social['url']) . '\">';\n    echo '<i class=\"' . esc_attr(\$social['icon']) . '\"></i>';\n    echo '</a>';\n  }\n}\n?>",
      'gallery' => "<?php\n\$images = themeplus_get_option('{$field_id}', []);\nif (!empty(\$images)) {\n  foreach (\$images as \$image_id) {\n    echo wp_get_attachment_image(\$image_id, 'full');\n  }\n}\n?>",
      'dimensions', 'spacing', 'border' => "<?php\n\$values = themeplus_get_option('{$field_id}', []);\necho 'Top: ' . \$values['top'];\necho 'Right: ' . \$values['right'];\necho 'Bottom: ' . \$values['bottom'];\necho 'Left: ' . \$values['left'];\n?>",
      'typography' => "<?php\n\$typo = themeplus_get_option('{$field_id}', []);\necho '<div style=\"';\necho 'font-family: ' . \$typo['font-family'] . ';';\necho 'font-size: ' . \$typo['font-size'] . ';';\necho 'font-weight: ' . \$typo['font-weight'] . ';';\necho '\">';\necho 'Your text';\necho '</div>';\n?>",
      'background' => "<?php\n\$bg = themeplus_get_option('{$field_id}', []);\necho '<div style=\"';\necho 'background-color: ' . \$bg['color'] . ';';\nif (!empty(\$bg['image'])) {\n  echo 'background-image: url(' . \$bg['image'] . ');';\n  echo 'background-size: ' . \$bg['size'] . ';';\n}\necho '\">';\necho 'Content';\necho '</div>';\n?>",
      'icon' => "<?php\n\$icon = themeplus_get_option('{$field_id}', 'fa-solid fa-house');\necho '<i class=\"' . esc_attr(\$icon) . '\"></i>';\n?>",
      default => "<?php\n\$values = themeplus_get_option('{$field_id}', []);\nif (!empty(\$values)) {\n  foreach (\$values as \$key => \$value) {\n    echo \$key . ': ' . \$value;\n  }\n}\n?>",
    };
  }

  /**
   * Get statistics
   *
   * @return array
   */
  public static function get_statistics(): array {
    $fields = ThemePlus_Config::get_all_fields();
    $sections = ThemePlus_Config::get_sections();

    $by_type = [];
    $by_section = [];

    foreach ($fields as $field) {
      $type = $field['type'];
      $by_type[$type] = ($by_type[$type] ?? 0) + 1;
    }

    foreach ($sections as $section) {
      if ($section['id'] === 'developer-panel') {
        continue;
      }
      $count = count($section['fields']);
      foreach ($section['subsections'] as $sub) {
        $count += count($sub['fields']);
      }
      $by_section[$section['title']] = $count;
    }

    return [
      'total_fields'   => count($fields),
      'total_sections' => count($sections) - 1,
      'by_type'        => $by_type,
      'by_section'     => $by_section,
    ];
  }
}