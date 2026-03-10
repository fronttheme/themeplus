=== ThemePlus — Modern Theme Options Framework ===
Contributors: farukahmed
Tags: theme options, framework, redux alternative, options panel, theme settings
Requires at least: 6.8
Tested up to: 6.8
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A free, modern, lightweight theme options framework for WordPress. A React-powered alternative to Redux Framework with 30 field types, white-label support, and a beautiful UI.

== Description ==

**ThemePlus is a free, open-source WordPress theme options framework built for developers who want a modern, lightweight alternative to Redux Framework — without the bloat, the legacy code, or the outdated UI.**

At just 373KB total, ThemePlus delivers a React-powered admin interface, 30 field types, full white-label support, Google Fonts integration, custom font uploads, Import/Export, conditional logic, a built-in REST API, and a Developer Panel — all for free, with no license keys and no upsells.

= Why ThemePlus? =

Redux Framework served the WordPress community well for years. But it carries significant technical debt: legacy PHP patterns with PHP 8.x compatibility issues, a jQuery-heavy frontend, an outdated UI, and infrequent updates. ThemePlus is built from scratch with modern tools — React, Vite, SCSS with BEM — for developers building themes today.

= 30 Field Types =

Every input a theme could need, organised into clean categories:

* **Text** — Text, Textarea
* **Number** — Number / Spinner, Slider
* **Choice** — Select, Button Set, Radio, Checkbox, Select Image
* **Toggle** — Toggle / Switch
* **Color** — Color Picker, Gradient Picker
* **Media** — Image, Gallery, Icon (FontAwesome)
* **Layout** — Typography, Dimensions, Spacing, Border
* **Special** — Info, Section, Raw, Shortcode
* **Date** — Date Picker
* **Social** — Social Media Links
* **Code** — Code Editor (CSS & JavaScript)
* **Advanced** — Repeater, Background, Link, Group

= Full White-label Support =

ThemePlus is designed to disappear into your theme. Configure `themeplus_framework_config()` with your theme's name, menu slug, option key, and icon — your users will see your theme's own settings panel, never "ThemePlus".

= Google Fonts + Custom Fonts =

Browse and load from 1,899 Google Fonts with live preview directly inside the Typography field. Or upload and manage self-hosted fonts (WOFF2, WOFF, TTF, OTF) via the built-in Custom Fonts module.

= Conditional Logic =

Show or hide any field based on the value of another field. Supports single conditions, multiple AND conditions, multiple OR conditions, and all field types including arrays and checkboxes via dot notation.

`'required' => ['enable_preloader', '==', true]`
`'required' => ['header_elements', 'contains', 'search']`
`'required' => ['logo', '!empty']`

= Sections & Subsections =

Organise your theme options into a clean hierarchical sidebar. Sections can contain flat fields, nested subsections, or both. Priority-based ordering gives full control over the sidebar structure.

= Import / Export =

Backup and restore all theme settings with one click. Built-in Import/Export section handles JSON serialisation and restores defaults cleanly.

= REST API =

Full CRUD REST API under the `themeplus/v1` namespace — get options, save options, reset all, reset section, and get full configuration. All endpoints protected by `manage_options` capability with nonce verification.

= Developer Panel =

Enable dev mode to access a dedicated Developer Panel showing every registered field with its current value, PHP data type, and ready-to-use code snippets for all three access patterns. Includes field statistics grouped by type and section.

= Unsaved Changes Detection =

ThemePlus warns before navigating away with unsaved changes — so no accidental loss of work.

= Live Search =

Instantly search across all fields and sections by field title, subtitle, description, or ID.

= Dark & Light Mode =

The admin UI respects the user's WordPress colour scheme preference, with a manual toggle available in the header.

= GPL Licensed — Free Forever =

ThemePlus is released under GPL-2.0-or-later — the same licence as WordPress itself. Use it in personal projects, client work, and commercial ThemeForest themes without restriction. No licence keys, no feature tiers, no upsells.

== Installation ==

= Option 1 — Upload ZIP =

1. Download the latest `themeplus.zip` from [GitHub Releases](https://github.com/fronttheme/themeplus/releases)
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload the ZIP and click **Activate**

= Option 2 — Clone via Git =

`cd wp-content/plugins && git clone https://github.com/fronttheme/themeplus.git`

Then activate from **Plugins** in your WordPress admin.

= Option 3 — WordPress.org (this page) =

Search for **ThemePlus** in **Plugins → Add New** and click **Install Now**.

= After Activation =

ThemePlus does nothing on its own — it is a framework for theme developers. To add a settings panel to your theme:

1. Copy `includes/config/sample-config.php` from the plugin into your theme
2. Include it in `functions.php`: `require_once get_template_directory() . '/inc/themeplus-config.php';`
3. Configure `themeplus_framework_config()` with your theme's details
4. Add sections and fields using `themeplus_add_section()`
5. Retrieve values in your theme with `themeplus_get_option('field_id')`

== Frequently Asked Questions ==

= Is ThemePlus really free? =

Yes, completely. ThemePlus is open-source and licensed under GPL-2.0-or-later. There are no premium tiers, no feature locks, and no licence keys. Everything described on this page is included at no cost.

= Is this a replacement for Redux Framework? =

ThemePlus covers the full feature set of Redux Framework and extends it — 30 field types, white-label support, conditional logic, Google Fonts, custom font uploads, Import/Export, REST API, and a Developer Panel — all in a modern React UI at 373KB. If you are using Redux Framework and want a maintained, modern alternative, ThemePlus is built for exactly that.

= Does it work with PHP 8.0+? =

Yes. ThemePlus requires PHP 8.0 or higher and is built specifically for modern PHP. It uses PHP 8 type hints, named arguments, and match expressions throughout.

= How do I get an option value in my theme? =

Use the `themeplus_get_option()` helper:

`$value = themeplus_get_option( 'field_id', 'default_value' );`

Or get all options at once for multiple fields:

`$options = themeplus_get_option();`

= Can I use ThemePlus in a ThemeForest theme? =

Yes. ThemePlus is GPL-licensed and can be bundled with commercial themes. The recommended approach for ThemeForest is to require ThemePlus via TGM Plugin Activation so buyers can install it from your theme package.

= Does it support conditional field logic? =

Yes. Show or hide any field based on another field's value using the `required` key. Supports `==`, `!=`, `>`, `<`, `>=`, `<=`, `contains`, `!contains`, `empty`, and `!empty` operators, plus AND/OR multiple conditions.

= Can my theme have its own branding in the settings panel? =

Yes — full white-label support is built in. Set `display_name`, `menu_slug`, `menu_title`, `page_title`, `menu_icon`, and `opt_name` in `themeplus_framework_config()` and the panel appears entirely under your theme's identity.

= Does ThemePlus support Google Fonts? =

Yes. The Typography field includes a searchable Google Fonts browser with 1,899 fonts, live preview, subset selection, and automatic font enqueueing on the frontend.

= Can I upload custom fonts? =

Yes. ThemePlus includes a dedicated Custom Fonts module for uploading and managing self-hosted fonts in WOFF2, WOFF, TTF, and OTF formats.

= What is the Developer Panel? =

When dev mode is active (`define('THEMEPLUS_DEV', true)` in `wp-config.php`), a Developer Panel section appears in the sidebar showing every registered field with its current value, PHP data type, and copy-ready code snippets. Useful for building and debugging theme configs.

= Will it be available on WordPress.org? =

Yes — a WordPress.org submission is in progress. Once approved, ThemePlus will be installable directly from the WordPress plugin directory.

== Screenshots ==

1. ThemePlus admin panel — clean, modern React UI
2. Field types overview — all 30 field types in one view
3. Typography field — Google Fonts browser with live preview
4. Custom Fonts module — upload and manage self-hosted fonts
5. Conditional logic — fields shown/hidden based on other values
6. Import/Export — backup and restore settings
7. Developer Panel — field metadata and code snippets
8. Dark mode — admin UI in dark colour scheme

== Changelog ==

= 1.0.0 — March 2026 =
* Initial release
* Add: 30 field types — Text, Textarea, Number, Spinner, Slider, Select, Button Set, Radio, Checkbox, Select Image, Toggle, Color Picker, Gradient Picker, Image, Gallery, Icon, Typography, Dimensions, Spacing, Border, Info, Section, Raw, Shortcode, Date Picker, Social Media, Code Editor, Repeater, Background, Link, Group
* Add: React-powered admin UI with WordPress components
* Add: Full white-label support via themeplus_framework_config()
* Add: Sections and subsections with priority-based ordering
* Add: Conditional logic with 10 operators and AND/OR relations
* Add: Google Fonts integration with 1,899 fonts and live preview
* Add: Custom Fonts module for self-hosted font uploads
* Add: Import/Export settings
* Add: REST API under themeplus/v1 namespace
* Add: Developer Panel (dev mode only)
* Add: Live field search
* Add: Dark and light mode
* Add: Unsaved changes detection
* Add: Helper functions — themeplus_get_option(), themeplus_update_option()
* Add: Full i18n/l10n support with .pot file
* Add: Vite 5 (SCSS) + webpack/wp-scripts (React) hybrid build system

== Upgrade Notice ==

= 1.0.0 =
Initial release.