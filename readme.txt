=== ThemePlus ===
Contributors: farukahmed
Tags: theme options, framework, options panel, theme settings, redux alternative
Requires at least: 6.8
Tested up to: 7.0
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modern, React-powered WordPress theme options framework. 30 field types, white-label support, conditional logic — free forever.

== Description ==

**ThemePlus is a free, open-source WordPress theme options framework built for developers who want a modern, lightweight alternative to Redux Framework — without the bloat, the legacy code, or the outdated UI.**

Built from scratch with React, Vite, and modern PHP 8, ThemePlus delivers a polished admin interface, 30 field types, full white-label support, Google Fonts integration, custom font uploads, Import/Export, conditional logic, a REST API, and a Developer Panel — all free, with no licence keys and no upsells.

= Why ThemePlus? =

Redux Framework served the WordPress community well for years. But it carries significant technical debt: legacy PHP patterns, jQuery dependency, an outdated UI, and infrequent updates. ThemePlus is built from scratch with modern tools for developers building themes today.

* **Modern stack** — React 18, Vite 5, SCSS/BEM, PHP 8 type hints throughout
* **Lightweight** — 392KB total including all assets
* **White-label** — your users see your theme's panel, never "ThemePlus"
* **Open source** — GPL-2.0-or-later, free forever, no upsells

= 30 Field Types =

Every input a theme could need, organised into clean categories:

* **Text** — Text, Textarea
* **Number** — Number / Spinner, Slider
* **Choice** — Select, Button Set, Radio, Checkbox, Select Image
* **Toggle** — Toggle / Switch
* **Color** — Color Picker, Gradient Picker
* **Media** — Image, Gallery, Icon (FontAwesome 6)
* **Layout** — Typography, Dimensions, Spacing, Border
* **Special** — Info, Section, Raw, Shortcode
* **Date** — Date Picker (date only or date + time)
* **Social** — Social Media Links (20 platforms)
* **Code** — Code Editor (CSS, JavaScript, HTML)
* **Advanced** — Repeater, Background, Link, Group

Every field has a verified, documented value shape. For example:

* `image` returns `{ id, url, width, height, alt, title }` — empty array when no image selected
* `gallery` returns an array of `{ id, url, alt }` rows
* `border` returns `{ width, style, color, radius }`
* `social_media` returns an array of `{ platform, url }` rows
* `repeater` returns an array of row arrays keyed by sub-field id
* `gradient_picker` returns a complete CSS `linear-gradient()` string

= White-Label Support =

ThemePlus is designed to disappear into your theme. Configure `themeplus_framework_config()` with your theme's name, slug, option key, and icon — your users see your theme's own settings panel, never "ThemePlus".

**Convention:** section and subsection `icon` takes a FontAwesome name only (`'pen'`). The Icon *field* default takes the full FontAwesome class (`'fa-solid fa-star'`). The plugin translates its own fallback strings; your theme translates its config strings in your own text domain.

= Google Fonts + Custom Fonts =

The Typography field includes a searchable browser of 1,899 Google Fonts with live preview, weight and style selection, subset support, and automatic font enqueueing on the frontend. Skip Google Fonts entirely and upload self-hosted fonts (WOFF2, WOFF) via the built-in Custom Fonts module — magic-byte verified, capability-gated, and output into `@font-face` rules automatically.

**Note:** Custom fonts are stored as Media Library attachments and are not affected by Reset All or Reset Section — use the per-font Delete button to remove uploaded files.

= Conditional Logic =

Show or hide any field based on the value of another. Supports 10 operators and three relation formats:

**Operators:** `==`, `!=`, `>`, `<`, `>=`, `<=`, `contains`, `!contains`, `empty`, `!empty`

**Single condition:**
`'required' => ['sidebar_position', '==', 'left']`

**Multiple AND conditions:**
`'required' => [['enable_header', '==', true], ['header_style', '!=', 'minimal']]`

**Multiple OR conditions:**
`'required' => ['relation' => 'OR', 'conditions' => [['mode', '==', 'simple'], ['mode', '==', 'expert']]]`

**Array value (matches any):**
`'required' => ['header_elements', 'contains', 'search']`

**Dot-notation sub-key:**
`'required' => ['body_typography.font-family', '==', 'Inter']`

**empty / !empty note:** `false` and `0` are NOT considered empty — only truly absent values, empty strings, empty arrays, and `null`.

= Sections and Subsections =

Organise theme options into a hierarchical sidebar. Add sections with `themeplus_add_section()`, nest subsections inline via the `subsections` key, or attach subsections from a separate hook with `themeplus_add_subsection()` — the pattern for child themes and extension plugins.

= Import / Export =

Backup and restore all theme settings with one click. Import/Export handles JSON serialisation and restores defaults cleanly.

= REST API =

Full REST API under the `themeplus/v1` namespace — get options, save options, reset all, reset section, get configuration. All endpoints require the configured capability (default `edit_theme_options`) with nonce verification. Options are sanitized per field type before storage.

= Developer Panel =

Enable dev mode (`define('THEMEPLUS_DEV', true)`) to access a Developer Panel showing every registered field with its current value, PHP data type, and copy-ready code snippets for all three access patterns. Includes field statistics by type and section.

= Security =

* All saved options pass through a per-field-type sanitizer (`ThemePlus_Sanitizer`) — unknown keys are dropped, values are validated against registered field configuration
* REST endpoints are capability-gated with nonce verification
* Font uploads are MIME-type and magic-byte verified
* Output is escaped at every render point

= GPL Licensed — Free Forever =

ThemePlus is GPL-2.0-or-later — the same licence as WordPress itself. Use it in personal projects, client work, and commercial ThemeForest themes without restriction.

== Installation ==

= From WordPress.org =

1. Go to **Plugins → Add New**
2. Search for **ThemePlus**
3. Click **Install Now** then **Activate**

= Upload ZIP =

1. Download `themeplus.zip` from [GitHub Releases](https://github.com/fronttheme/themeplus/releases)
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload the ZIP and activate

= After Activation =

ThemePlus does nothing on its own — it is a framework for theme developers. To add a settings panel to your theme:

1. Copy `includes/config/sample-config.php` from the plugin into your theme (rename `my_theme_` prefixes to your own)
2. Include it in `functions.php`: `require_once get_template_directory() . '/inc/themeplus-config.php';`
3. Configure `themeplus_framework_config()` with your theme's details
4. Add sections and fields using `themeplus_add_section()`
5. Retrieve values with `themeplus_get_option('field_id')`

== Frequently Asked Questions ==

= Is ThemePlus really free? =

Yes, completely. ThemePlus is open-source and GPL-2.0-or-later. There are no premium tiers, no feature locks, and no licence keys.

= Is this a replacement for Redux Framework? =

ThemePlus covers the full Redux Framework feature set and extends it — 30 field types, white-label support, conditional logic, Google Fonts, custom fonts, Import/Export, REST API, and a Developer Panel — in a modern React UI. If you are using Redux Framework and want a maintained, modern alternative, ThemePlus is built for exactly that.

= Does it work with PHP 8.0+? =

Yes. ThemePlus requires PHP 8.0 or higher and uses PHP 8 type hints, union types, and named arguments throughout.

= How do I retrieve an option value in my theme? =

`$value = themeplus_get_option( 'field_id', 'default_value' );`

For structured fields like image, border, or repeater, the return value is an array — see the field shapes in the Description section above.

= What is the correct way to use the icon field vs section icons? =

Section and subsection `icon` takes a FontAwesome **name only**: `'pen'`, `'palette'`, `'code'`. The Icon **field** `default` takes the **full FontAwesome class**: `'fa-solid fa-star'`, `'fa-brands fa-github'`. The picker modal handles selection in the UI — the default is only the stored fallback.

= Can I use ThemePlus in a ThemeForest theme? =

Yes. ThemePlus is GPL-licensed and can be bundled with commercial themes. The recommended approach for ThemeForest is TGM Plugin Activation so buyers can install it from your theme package.

= Does it support multisite? =

The plugin activates per-site. The uninstall routine cleans up options across all sites on the network.

= Why are my custom fonts not reset when I click Reset All? =

Custom fonts are uploaded files stored in the Media Library — not option values. Reset All and Reset Section only affect your option values. Use the Delete button in the Custom Fonts section to remove uploaded font files. This is intentional: resetting settings should never silently delete uploaded assets.

= Does the Typography field load Google Fonts automatically? =

Yes. Any typography field set to a Google Font is automatically enqueued on the frontend via a combined Google Fonts URL. System fonts and custom uploaded fonts are detected and excluded from the Google Fonts request automatically.

= What is the Developer Panel? =

When `define('THEMEPLUS_DEV', true)` is added to `wp-config.php`, a Developer Panel appears in the sidebar showing every registered field with its current saved value, PHP data type, dependency metadata, and code snippets for `themeplus_get_option()`, direct array access, and `themeplus_update_option()`. Remove the constant on production sites.

= Can I add a subsection from a child theme or extension plugin? =

Yes — use `themeplus_add_subsection( 'parent_section_id', [ ...subsection config... ] )` from your own `init` hook (priority 20 or later, after the parent section is registered). This is the recommended pattern for child themes and addon plugins extending a parent theme's panel.

= Does ThemePlus support empty/!empty conditional logic on false and 0? =

No — intentionally. `false` and `0` are NOT considered empty. Only truly absent values, empty strings, empty arrays, and `null` trigger `empty`. This matches PHP's `empty()` semantics for booleans and integers, which is the least surprising behaviour for theme developers.

== External Services ==

This plugin can optionally connect to Google Fonts (fonts.googleapis.com) when a Typography field is configured to use a Google Font. The selected font family name is sent to Google's servers to load the font stylesheet.

* Google Fonts is only requested when a typography field value contains a Google Font name — it is never loaded by default
* No personal data is sent — only font family names and subset preferences
* Google Privacy Policy: https://policies.google.com/privacy
* Google Fonts Terms: https://developers.google.com/fonts/terms

To avoid any Google Fonts requests entirely, use only system fonts or upload self-hosted fonts via the Custom Fonts module.

== Screenshots ==

1. ThemePlus admin panel — clean, modern React UI with sidebar navigation
2. All 30 field types — complete field type overview
3. Typography field — Google Fonts browser with live preview and subset selection
4. Custom Fonts module — upload and manage self-hosted WOFF2/WOFF fonts
5. Conditional logic — fields shown and hidden based on other field values
6. Import/Export — one-click backup and restore of all settings
7. Developer Panel — field metadata, current values, and code snippets
8. Dark mode — full dark colour scheme matching WordPress admin

== Changelog ==

= 1.0.0 =
* Initial release
* 30 field types: Text, Textarea, Number, Spinner, Slider, Select, Button Set, Radio, Checkbox, Select Image, Toggle, Switch, Color Picker, Gradient Picker, Image, Gallery, Icon, Typography, Dimensions, Spacing, Border, Info, Section, Raw, Shortcode, Date Picker, Social Media, Code Editor, Repeater, Background, Link, Group
* React 18 + WordPress components admin UI
* White-label support via themeplus_framework_config()
* Sections and subsections with priority ordering and themeplus_add_subsection() API
* Conditional logic: 10 operators, AND/OR relations, array values, dot-notation sub-keys
* Google Fonts integration: 1,899 fonts, live preview, subset selection, auto-enqueue
* Custom Fonts module: WOFF2/WOFF upload, magic-byte verification, @font-face generation
* Per-field-type sanitization on all saved options via ThemePlus_Sanitizer
* REST API: themeplus/v1 — get, save, reset-all, reset-section, config
* Developer Panel with field metadata and code snippets (dev mode only)
* Live field search across titles, subtitles, descriptions, and IDs
* Import/Export settings as JSON
* Unsaved changes detection with navigation warning
* Dark and light mode
* Helper functions: themeplus_get_option(), themeplus_update_option(), themeplus_add_section(), themeplus_add_subsection()
* Full i18n/l10n support with .pot file

== Upgrade Notice ==

= 1.0.0 =
Initial release — no upgrade steps required.
