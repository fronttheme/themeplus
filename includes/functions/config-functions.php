<?php
/**
 * ThemePlus Configuration Helper Functions
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Add a section
 *
 * @param array $section Section configuration
 */
function themeplus_add_section(array $section): void {
  ThemePlus_Config::add_section($section);
}

/**
 * Add a subsection
 *
 * @param string $parent_id Parent section ID
 * @param array $subsection Subsection configuration
 */
function themeplus_add_subsection(string $parent_id, array $subsection): void {
  ThemePlus_Config::add_subsection($parent_id, $subsection);
}

/**
 * Get all sections
 *
 * @return array
 */
function themeplus_get_sections(): array {
  return ThemePlus_Config::get_sections();
}

/**
 * Get section by ID
 *
 * @param string $section_id Section ID
 * @return array|null
 */
function themeplus_get_section(string $section_id): ?array {
  return ThemePlus_Config::get_section($section_id);
}

/**
 * Get all fields
 *
 * @return array
 */
function themeplus_get_all_fields(): array {
  return ThemePlus_Config::get_all_fields();
}