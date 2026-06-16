# Changelog

All notable changes to ThemePlus will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — March 2026

### Added

- Add: 30 field types — Text, Textarea, Number, Spinner, Slider, Select, Button Set, Radio, Checkbox, Select Image, Toggle, Color Picker, Gradient Picker, Image, Gallery, Icon, Typography, Dimensions, Spacing, Border, Info, Section, Raw, Shortcode, Date Picker, Social Media, Code Editor, Repeater, Background, Link, Group
- Add: React-powered admin UI built with `@wordpress/element` and WordPress Components
- Add: Full white-label support via `themeplus_framework_config()` — rename menu, slug, icon, option key
- Add: Sections and subsections with priority-based ordering in the sidebar
- Add: Conditional logic with 10 operators (`==`, `!=`, `>`, `<`, `>=`, `<=`, `contains`, `!contains`, `empty`, `!empty`) and AND/OR multiple conditions
- Add: Google Fonts integration — browse and load from 1,899 fonts with live preview inside the Typography field
- Add: Custom Fonts module — upload and manage self-hosted fonts (WOFF2, WOFF, TTF, OTF)
- Add: Import/Export settings — backup and restore all theme options as JSON with one click
- Add: REST API under `themeplus/v1` namespace with full CRUD — get options, save options, reset all, reset section, get config
- Add: Developer Panel (dev mode only) — dedicated sidebar section showing every registered field with its current value, PHP data type, and ready-to-use code snippets for all three access patterns
- Add: Live field search — instantly search across all fields and sections by title, subtitle, description, or ID
- Add: Dark and light mode — admin UI respects the user's WordPress color scheme with a manual toggle in the header
- Add: Unsaved changes detection — warns before navigating away with unsaved changes
- Add: Helper functions — `themeplus_get_option()`, `themeplus_update_option()`, `themeplus_is_active()`, `themeplus_get_version()`
- Add: Config functions — `themeplus_add_section()`, `themeplus_add_subsection()`, `themeplus_get_sections()`, `themeplus_get_section()`, `themeplus_get_all_fields()`
- Add: Full i18n/l10n support with `.pot` file included
- Add: Hybrid build system — Vite 5 for SCSS with HMR, webpack/`@wordpress/scripts` for React/JSX
- Add: `ThemePlus_Framework_Config` — white-label configuration class with `set()`, `get()`, `get_all()`, `is_configured()`, `is_dev_mode()` methods
- Add: `ThemePlus_Config` — section and field registration with priority-based sorting
- Add: `ThemePlus_Settings` — option storage backed by `get_option()` / `update_option()`
- Add: `ThemePlus_REST_API` — REST route registration with nonce-verified POST endpoints
- Add: `ThemePlus_Admin` — asset enqueueing, localized script data, admin page rendering, notice isolation
- Add: `ThemePlus_Dev_Panel` — field metadata, usage example generation, and statistics for the Developer Panel
- Add: Custom Fonts module with four classes — Manager, API, Frontend, MimeType
- Add: `sample-config.php` — copy-and-customize configuration file for theme developers
- Add: `default-config.php` — built-in Custom Fonts, Import/Export, and Developer Panel sections
- Add: Singleton pattern for the main `ThemePlus` class
- Add: `SECURITY.md`, `CONTRIBUTING.md`, `.distignore`, `.gitattributes` for repository hygiene

### Fixed (pre-release audit)
- Fix: Per-field-type sanitization of all saved options via ThemePlus_Sanitizer — unknown keys dropped, values validated against registered field config
- Fix: Font upload magic-byte verification now correctly rejects files with mismatched bytes
- Fix: REST API permission check now honors configured capability instead of hardcoded manage_options
- Fix: Font MIME types gated behind configured capability — previously added for all uploads
- Fix: Stale useState in eight fields (Link, Social, Background, Spacing, Gallery, DatePicker, Repeater, Group) — all now derive from props for correct Reset/Import behavior
- Fix: App.jsx forced re-render workaround removed — fields derive from props correctly
- Fix: Dev Panel conditional parser handles all five dependency formats
- Fix: Search tokenized matching includes section/subsection titles and field type in haystack
- Fix: highlightText regex escape prevents crash on special characters
- Fix: contains/!contains uses loose equality consistent with == operator
- Fix: DatePicker Dropdown deprecation — position prop replaced with popoverProps placement
- Fix: framework-config i18n — variable text domain replaced with literal; strings now extractable by WP.org translation system
- Fix: Font CSS output escaping — family names sanitized, URLs escaped at build time in generate_font_face()
- Fix: save_options empty payload guard — && corrected to || preventing accidental options wipe
- Fix: clean_admin_page uses exact screen ID match instead of substring check
- Fix: load_plugin_textdomain() removed — autoloaded by WordPress since 4.6
- Fix: sample-config.php example function renamed to themeplus_sample_get_option

[1.0.0]: https://github.com/fronttheme/themeplus/releases/tag/v1.0.0