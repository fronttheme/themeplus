<?php
/**
 * ThemePlus Configuration Class
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Configuration Class
 */
class ThemePlus_Config {

  /**
   * Sections array
   *
   * @var array
   */
  private static array $sections = [];

  /**
   * Field types whose options are sent to the admin panel as ordered { value, label } rows.
   */
  private const CHOICE_FIELD_TYPES = ['select', 'radio', 'button_set', 'checkbox'];

  /**
   * Convert any supported options format into an ordered list of rows with a string 'value'.
   *
   * Supported formats: 'key' => 'Label' map, list of scalars, list of { value, label } rows.
   * A list (keys 0, 1, 2…) uses its items as values; any other array uses its keys, numeric keys included.
   *
   * @param array $options Options as written in the field config.
   * @return array<int, array> Rows such as ['value' => '7435', 'label' => 'Footer 1'].
   */
  public static function option_rows(array $options): array {
    $is_list = array_is_list($options);
    $rows    = [];

    foreach ($options as $key => $option) {
      if (is_array($option) && isset($option['value'])) {
        $option['value'] = (string)$option['value'];
        $rows[]          = $option;
      } elseif (!$is_list) {
        $rows[] = is_array($option)
          ? ['value' => (string)$key] + $option
          : ['value' => (string)$key, 'label' => (string)$option];
      } elseif (is_scalar($option)) {
        $rows[] = ['value' => (string)$option, 'label' => (string)$option];
      }
    }

    return $rows;
  }

  /**
   * Prepare a list of fields for the admin panel and the sanitizer.
   *
   * @param array $fields Fields as written in the section config.
   * @return array
   */
  private static function prepare_fields(array $fields): array {
    foreach ($fields as $index => $field) {
      $fields[$index] = self::prepare_field($field);
    }

    return $fields;
  }

  /**
   * Choice fields get ordered option rows and a string default; nested fields are prepared the same way.
   *
   * @param array $field Field configuration.
   * @return array
   */
  private static function prepare_field(array $field): array {
    $is_choice_field = in_array($field['type'] ?? '', self::CHOICE_FIELD_TYPES, true);

    if ($is_choice_field && is_array($field['options'] ?? null)) {
      $field['options'] = self::option_rows($field['options']);

      if (is_array($field['default'] ?? null)) {
        $field['default'] = array_map('strval', $field['default']);
      } elseif (is_scalar($field['default'] ?? null)) {
        $field['default'] = (string)$field['default'];
      }
    }

    foreach (['fields', 'sub_fields'] as $nested_key) {
      if (is_array($field[$nested_key] ?? null)) {
        $field[$nested_key] = self::prepare_fields($field[$nested_key]);
      }
    }

    return $field;
  }

  /**
   * Add a section
   *
   * @param array $section Section configuration
   */
  public static function add_section(array $section): void {
    $defaults = [
      'id'          => '',
      'title'       => '',
      'icon'        => 'cog',
      'subsections' => [],
      'fields'      => [],
      'priority'    => 10,
    ];

    $section = wp_parse_args($section, $defaults);

    if (empty($section['id'])) {
      return;
    }

    $section['fields'] = self::prepare_fields($section['fields']);

    foreach ($section['subsections'] as $index => $subsection) {
      $section['subsections'][$index]['fields'] = self::prepare_fields($subsection['fields'] ?? []);
    }

    self::$sections[$section['id']] = $section;
  }

  /**
   * Add a subsection to existing section
   *
   * @param string $parent_id Parent section ID
   * @param array $subsection Subsection configuration
   */
  public static function add_subsection(string $parent_id, array $subsection): void {
    if (!isset(self::$sections[$parent_id])) {
      return;
    }

    $defaults = [
      'id'     => '',
      'title'  => '',
      'fields' => [],
    ];

    $subsection = wp_parse_args($subsection, $defaults);

    if (empty($subsection['id'])) {
      return;
    }

    $subsection['fields'] = self::prepare_fields($subsection['fields']);

    self::$sections[$parent_id]['subsections'][] = $subsection;
  }

  /**
   * Get all sections
   *
   * @return array
   */
  public static function get_sections(): array {
    // Sort by priority
    uasort(self::$sections, function ($a, $b) {
      return ($a['priority'] ?? 10) - ($b['priority'] ?? 10);
    });

    return self::$sections;
  }

  /**
   * Get section by ID
   *
   * @param string $section_id Section ID
   * @return array|null
   */
  public static function get_section(string $section_id): ?array {
    return self::$sections[$section_id] ?? null;
  }

  /**
   * Get all fields (flattened from all sections)
   *
   * @return array
   */
  public static function get_all_fields(): array {
    $fields = [];

    foreach (self::$sections as $section) {
      // Section fields
      foreach ($section['fields'] as $field) {
        $fields[$field['id']] = $field;
      }

      // Subsection fields
      foreach ($section['subsections'] as $subsection) {
        foreach ($subsection['fields'] as $field) {
          $fields[$field['id']] = $field;
        }
      }
    }

    return $fields;
  }

  /**
   * Reset sections (useful for testing)
   */
  public static function reset(): void {
    self::$sections = [];
  }
}