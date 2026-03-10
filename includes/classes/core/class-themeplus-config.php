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