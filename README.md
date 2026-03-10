![ThemePlus — Modern Theme Options Framework for WordPress](https://www.fronttheme.com/wp-content/uploads/2026/03/themeplus-modern-theme-options-framework-for-wordpress.webp)

# ThemePlus — Modern Theme Options Framework for WordPress

**A free, open-source, lightweight alternative to Redux Framework.**
Build powerful theme options panels with a beautiful React UI — no bloat, no paywalls, no legacy code.

[![WordPress](https://img.shields.io/badge/WordPress-6.8%2B-blue?logo=wordpress)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-8.0%2B-777BB4?logo=php)](https://php.net)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange)](https://github.com/fronttheme/themeplus/releases)

[Features](#-features) · [Field Types](#-field-types) · [Installation](#-installation) · [Usage](#-usage) · [White-label](#-white-label) · [REST API](#-rest-api) · [Contributing](#-contributing)

&nbsp;

[![Full Documentation](https://img.shields.io/badge/Full%20Documentation-%20fronttheme.com-6f42c1?style=for-the-badge&logo=wordpress&logoColor=white)](https://www.fronttheme.com/docs/themeplus/)

---

## ✨ Features

- 🎨 **React-Powered Admin UI** — Modern, polished interface built with React and WordPress components
- 🧩 **30 Field Types** — Every input type a theme could ever need, nothing more
- 🏷️ **Full White-label Support** — Rename everything: menu title, slug, icon, option key — it becomes your theme's own settings panel
- 📂 **Sections & Subsections** — Organize options into a clean hierarchical sidebar navigation
- 🔀 **Conditional Logic** — Show or hide any field based on the value of another field
- 🔤 **Google Fonts Integration** — Browse and load from 1,899 Google Fonts with live preview
- 🅰️ **Custom Fonts Module** — Upload and manage self-hosted fonts (WOFF2, WOFF, TTF, OTF)
- 📤 **Import / Export** — Backup and restore all theme settings with one click
- 🔍 **Live Search** — Instantly search across all fields and sections
- 🌗 **Dark & Light Mode** — Admin UI respects the user's WordPress color scheme
- ⚠️ **Unsaved Changes Detection** — Warns before navigating away with unsaved changes
- 🔌 **REST API** — Full CRUD endpoints under `themeplus/v1` namespace
- 🛠️ **Developer Panel** — Dev-mode-only panel showing field metadata, usage examples, and statistics
- 🪶 **373KB total** — Lightweight alternative to Redux Framework with a fraction of the footprint
- 🧹 **Modern PHP 8.0+** — Clean, singleton-pattern architecture with type hints throughout
- 🌍 **i18n Ready** — Full internationalisation support with `.pot` file included

---

## 🧩 Field Types

30 field types across 12 categories — everything a theme needs, nothing it doesn't.

| Category | Fields |
|---|---|
| **Text** | Text, Textarea |
| **Number** | Number / Spinner, Slider |
| **Choice** | Select, Button Set, Radio, Checkbox, Select Image |
| **Toggle** | Toggle / Switch |
| **Color** | Color Picker, Gradient Picker |
| **Media** | Image, Gallery, Icon |
| **Layout** | Typography, Dimensions, Spacing, Border |
| **Special** | Info, Section, Shortcode, Raw |
| **Date** | Date Picker |
| **Social** | Social Media |
| **Code** | Code Editor |
| **Advanced** | Repeater, Background, Link, Group |

---

## 📋 Requirements

| Requirement | Version |
|---|---|
| WordPress | 6.8 or higher |
| PHP | 8.0 or higher |

---

## 🚀 Installation

### Option 1 — Download ZIP (Recommended for most users)

1. Go to [Releases](https://github.com/fronttheme/themeplus/releases)
2. Download the latest `themeplus.zip`
3. In your WordPress admin go to **Plugins → Add New → Upload Plugin**
4. Upload the ZIP and click **Activate**

### Option 2 — Clone via Git

```bash
cd wp-content/plugins
git clone https://github.com/fronttheme/themeplus.git
```

Then activate the plugin from **Plugins** in your WordPress admin.

### Option 3 — TGM Plugin Activation *(Recommended for ThemeForest themes)*

```php
$plugins = [
    [
        'name'     => 'ThemePlus',
        'slug'     => 'themeplus',
        'source'   => 'https://github.com/fronttheme/themeplus/releases/latest/download/themeplus.zip',
        'required' => true,
    ],
];
```

### Option 4 — WordPress.org *(coming soon)*

ThemePlus will be available in the official WordPress plugin directory soon.

---

## 🛠️ Usage

### 1. Configure the Framework

Copy `includes/config/sample-config.php` from the plugin into your theme, then include it in `functions.php`:

```php
// In functions.php
require_once get_template_directory() . '/inc/themeplus-config.php';
```

```php
// In inc/themeplus-config.php
add_action('after_setup_theme', function () {

    if ( ! function_exists('themeplus_framework_config') ) {
        return;
    }

    $theme = wp_get_theme();

    themeplus_framework_config([
        'display_name' => $theme->get('Name'),
        'opt_name'     => 'my_theme_options',   // Unique DB key
        'menu_slug'    => 'my-theme-settings',
        'menu_title'   => __('Theme Settings', 'your-textdomain'),
        'menu_icon'    => 'dashicons-admin-appearance',
        'text_domain'  => 'your-textdomain',
    ]);

});
```

### 2. Add Sections & Fields

```php
add_action('init', function () {

    if ( ! function_exists('themeplus_add_section') ) {
        return;
    }

    themeplus_add_section([
        'id'     => 'general',
        'title'  => __('General Settings', 'your-textdomain'),
        'icon'   => 'cog',
        'fields' => [
            [
                'id'      => 'enable_preloader',
                'type'    => 'toggle',
                'title'   => __('Enable Preloader', 'your-textdomain'),
                'default' => true,
            ],
            [
                'id'      => 'primary_color',
                'type'    => 'color',
                'title'   => __('Primary Color', 'your-textdomain'),
                'default' => '#2271b1',
            ],
            [
                'id'      => 'body_font',
                'type'    => 'typography',
                'title'   => __('Body Typography', 'your-textdomain'),
                'default' => [
                    'font-family' => 'Inter',
                    'font-size'   => '16',
                    'font-weight' => '400',
                ],
            ],
        ],
    ]);

});
```

### 3. Add Subsections

Sections can contain nested subsections for deeper organisation:

```php
themeplus_add_section([
    'id'          => 'header',
    'title'       => __('Header', 'your-textdomain'),
    'icon'        => 'layout',
    'subsections' => [
        [
            'id'     => 'logo',
            'title'  => __('Logo', 'your-textdomain'),
            'fields' => [
                [
                    'id'    => 'logo_image',
                    'type'  => 'image',
                    'title' => __('Logo Image', 'your-textdomain'),
                ],
                [
                    'id'      => 'logo_width',
                    'type'    => 'number',
                    'title'   => __('Logo Width', 'your-textdomain'),
                    'default' => 150,
                    'unit'    => 'px',
                ],
            ],
        ],
        [
            'id'     => 'navigation',
            'title'  => __('Navigation', 'your-textdomain'),
            'fields' => [
                // ...
            ],
        ],
    ],
    'fields' => [],
]);
```

### 4. Use Options in Your Theme

```php
// Get a single option
$color = themeplus_get_option('primary_color', '#2271b1');

// Get all options at once (best for multiple fields)
$options = themeplus_get_option();
$color   = $options['primary_color'] ?? '#2271b1';
$enabled = $options['enable_preloader'] ?? true;

// Update an option programmatically
themeplus_update_option('primary_color', '#ff6b6b');
```

### 5. Conditional Logic

Show or hide any field based on another field's value:

```php
[
    'id'       => 'preloader_text',
    'type'     => 'text',
    'title'    => __('Preloader Text', 'your-textdomain'),
    'required' => ['enable_preloader', '=', true],  // Only shown when toggle is ON
],
```

**Supported operators:**

| Operator | Description |
|---|---|
| `==`, `=` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |
| `contains` | Value contains string, or array contains item |
| `!contains` | Value does not contain string, or array does not contain item |
| `empty` | Field has no value |
| `!empty` | Field has a value |

Multiple conditions with AND (default) or OR relation are also supported:

```php
// AND — all conditions must pass
'required' => [
    ['enable_header', '==', true],
    ['header_style', '!=', 'minimal'],
],

// OR — any condition must pass
'required' => [
    'relation' => 'OR',
    ['header_bg', '==', 'color'],
    ['header_bg', '==', 'gradient'],
],
```

---

## 📖 Helper Functions

```php
// Get a single option value
$value = themeplus_get_option( 'option_key', 'default_value' );

// Get all options as an array
$options = themeplus_get_option();

// Update a single option
themeplus_update_option( 'option_key', $new_value );

// Check if ThemePlus is active (safe to use before plugin loads)
if ( themeplus_is_active() ) {
    // ...
}

// Get plugin version
$version = themeplus_get_version();
```

---

## 🎨 White-label

ThemePlus is designed to disappear into your theme. Configure `themeplus_framework_config()` and your users will never see "ThemePlus" — they'll just see your theme's own settings panel.

```php
themeplus_framework_config([
    // Display
    'display_name'  => 'Nijhum Theme',           // Your theme name
    'opt_name'      => 'nijhum_options',          // Unique DB key — MUST be unique per theme

    // Admin Menu
    'menu_slug'     => 'nijhum-settings',
    'menu_title'    => 'Nijhum Settings',
    'page_title'    => 'Nijhum Theme Options',
    'menu_icon'     => 'dashicons-admin-appearance',
    'menu_position' => 61,
    'capability'    => 'edit_theme_options',

    // Features
    'admin_bar'     => true,                      // Show quick-access link in admin bar
    'show_search'   => true,                      // Enable live field search
    'dev_mode'      => defined('WP_DEBUG') && WP_DEBUG,

    // i18n
    'text_domain'   => 'nijhum',
]);
```

> **Important:** Always set a unique `opt_name` per theme. If two themes share the same key, their settings will collide in the database.

---

## 🔌 REST API

ThemePlus registers a complete REST API under the `themeplus/v1` namespace. All endpoints require the `manage_options` capability.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/themeplus/v1/options` | Get all saved options |
| `POST` | `/themeplus/v1/options` | Save all options |
| `POST` | `/themeplus/v1/options/reset` | Reset all options to defaults |
| `POST` | `/themeplus/v1/options/reset-section` | Reset a single section to defaults |
| `GET` | `/themeplus/v1/config` | Get full sections & fields configuration |
| `GET` | `/themeplus/v1/dev-panel` | Get dev panel data *(dev mode only)* |

---

## 🛠️ Developer Panel

Enable dev mode to access the built-in Developer Panel — a dedicated admin section that shows every registered field with its current value, data type, usage examples, and PHP code snippets for all three access patterns.

```php
// wp-config.php
define( 'WP_DEBUG', true );
define( 'THEMEPLUS_DEV', true );
```

The Developer Panel appears automatically as the last sidebar item when dev mode is active. It also exposes a `/themeplus/v1/dev-panel` REST endpoint with full field statistics and metadata.

---

## 👨‍💻 Development

### Prerequisites

- Node.js 18+
- npm
- Local WordPress install (e.g. [LocalWP](https://localwp.com/), MAMP, Laragon)

### Setup

```bash
cd wp-content/plugins
git clone https://github.com/fronttheme/themeplus.git
cd themeplus
npm install
```

### Enable Dev Mode

Add these constants to `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'THEMEPLUS_DEV', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_ENVIRONMENT_TYPE', 'local' );
```

> **Important:** `THEMEPLUS_DEV` must be the boolean `true` — not the string `"true"`.

### Commands

```bash
# Start Vite dev server (SCSS with HMR — requires THEMEPLUS_DEV)
npm run dev

# Start webpack watch (JS/React)
npm run blocks:start

# Production build — SCSS via Vite
npm run build

# Production build — JS/React via wp-scripts
npm run blocks:build

# Generate translation .pot file
npm run pot

# Build and package release ZIP
npm run package
```

### Build Architecture

ThemePlus uses a hybrid build system — a deliberate choice that plays to each tool's strengths:

| Tool | Handles | Output |
|---|---|---|
| **Vite** | SCSS → CSS (with HMR in dev) | `assets/css/admin.css` |
| **webpack / wp-scripts** | React / JSX → JS | `assets/js/admin.js` + `admin.asset.php` |

### Tech Stack

- **Build:** Vite 5 (CSS) + webpack via `@wordpress/scripts` (JS)
- **CSS:** SCSS — modular 7-1 architecture with BEM methodology
- **JS/UI:** React (via `@wordpress/element`), WordPress Components
- **PHP:** Singleton pattern, PHP 8.0+, type hints throughout
- **Fonts:** Google Fonts API (1,899 fonts) + custom font upload system

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow WordPress coding standards for PHP and keep JS changes consistent with the existing React component architecture.

For a full contribution guide including how to add new field types, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License

ThemePlus is licensed under the [GPL-2.0-or-later](./LICENSE) license — the same license as WordPress itself. You are free to use, modify, and distribute this plugin in personal projects, client work, and commercial themes.

---

## 👤 Author

**Faruk Ahmed**

- Website: [farukdesign.com](https://farukdesign.com)
- Brand: [fronttheme.com](https://fronttheme.com)
- GitHub: [@fronttheme](https://github.com/fronttheme)

---

Made with ❤️ for the WordPress community · [fronttheme.com](https://fronttheme.com)