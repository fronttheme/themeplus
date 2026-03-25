<?php
/**
 * ThemePlus Settings Class
 *
 * @package ThemePlus
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Settings Class
 */
class ThemePlus_Settings {

  /**
   * Get dynamic option key
   */
  public static function get_option_key(): string {
    return ThemePlus_Framework_Config::get('opt_name', 'themeplus_options');
  }

  /**
   * Get all options
   *
   * @return array
   */
  public static function get_all_options(): array {
    return get_option(self::get_option_key(), []);
  }

  /**
   * Get a single option value
   *
   * @param string $key Option key to retrieve
   * @param mixed $default Default value if key doesn't exist
   * @return mixed The option value or default
   */
  public static function get_option(string $key, mixed $default = ''): mixed {
    $options = self::get_all_options();
    return $options[$key] ?? $default;
  }

  /**
   * Update a single option value
   *
   * @param string $key Option key to update
   * @param mixed $value Value to set
   * @return bool True if the value was updated, false otherwise
   */
  public static function update_option(string $key, mixed $value): bool {
    $options = self::get_all_options();
    $options[$key] = $value;
    return update_option(self::get_option_key(), $options);
  }

  /**
   * Update all options
   *
   * @param array $options New options
   * @return bool
   */
  public static function update_all_options(array $options): bool {
    $result = update_option(self::get_option_key(), $options, false);

    if ($result) {
      do_action('themeplus/options/saved', $options);
    }

    return $result;
  }

  /**
   * Delete all options
   *
   * @return bool
   */
  public static function delete_all_options(): bool {
    return delete_option(self::get_option_key());
  }

}