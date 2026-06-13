# Contributing to ThemePlus

Thank you for your interest in contributing to ThemePlus. Contributions of all kinds are welcome — bug reports, feature requests, documentation improvements, and pull requests.

Please take a moment to read this guide before opening an issue or submitting a PR.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding a New Field Type](#adding-a-new-field-type)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

This project follows the [WordPress Community Code of Conduct](https://make.wordpress.org/handbook/community-code-of-conduct/). By participating, you agree to uphold it. Please be respectful and constructive in all interactions.

---

## Ways to Contribute

- **Report a bug** — Open an [issue](https://github.com/fronttheme/themeplus/issues) with clear steps to reproduce
- **Request a feature** — Open an [issue](https://github.com/fronttheme/themeplus/issues) describing the use case and proposed solution
- **Fix a bug** — Fork, fix, and open a pull request
- **Add a field type** — See [Adding a New Field Type](#adding-a-new-field-type) below
- **Improve documentation** — Typos, clarity, missing examples — all appreciated
- **Translate** — Contribute translations via the `.pot` file in `/languages/`

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm
- Local WordPress install ([LocalWP](https://localwp.com/) recommended)
- PHP 8.0+

### Setup

```bash
cd wp-content/plugins
git clone https://github.com/fronttheme/themeplus.git
cd themeplus
npm install
```

### Enable Dev Mode

Add the following to your `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'THEMEPLUS_DEV', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_ENVIRONMENT_TYPE', 'local' );
```

> `THEMEPLUS_DEV` must be the boolean `true` — not the string `"true"`.

### Build Commands

ThemePlus uses a hybrid build system — Vite for SCSS and webpack/`@wordpress/scripts` for React/JSX.

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

> Run `npm run dev` and `npm run blocks:start` in two separate terminals during development.

---

## Project Structure

```
themeplus/
├── assets/                        # Compiled assets (do not edit directly)
│   ├── css/admin.css              # Built by Vite from src/scss/
│   ├── js/admin.js                # Built by wp-scripts from src/js/
│   ├── js/admin.asset.php         # wp-scripts dependency manifest
│   └── fonts/fontawesome/         # Bundled FontAwesome 6
├── includes/
│   ├── classes/
│   │   ├── core/                  # Framework core classes
│   │   │   ├── class-themeplus-framework-config.php
│   │   │   ├── class-themeplus-config.php
│   │   │   ├── class-themeplus-settings.php
│   │   │   ├── class-themeplus-sanitizer.php
│   │   │   ├── class-themeplus-rest-api.php
│   │   │   ├── class-themeplus-admin.php
│   │   │   ├── class-themeplus-frontend.php
│   │   │   └── class-themeplus-dev-panel.php
│   │   └── custom-fonts/          # Custom Fonts module
│   │       ├── class-custom-fonts-manager.php
│   │       ├── class-custom-fonts-api.php
│   │       ├── class-custom-fonts-frontend.php
│   │       └── class-custom-fonts-mime-type.php
│   ├── config/
│   │   ├── default-config.php     # Built-in sections (Custom Fonts, Import/Export, Dev Panel)
│   │   └── sample-config.php      # Copy-and-customize template for theme developers
│   └── functions/                 # Public helper and config functions
├── src/
│   ├── js/admin/
│   │   ├── components/
│   │   │   ├── Fields/            # One file per field type (30 components)
│   │   │   ├── Common/            # Shared UI — FieldRenderer, Dialog, Select, SearchResults
│   │   │   ├── Layout/            # Sidebar, Header, Body, Footer, MainWrapper
│   │   │   ├── Sections/          # Import/Export, Custom Font Uploader
│   │   │   └── DevPanel/          # Developer Panel components
│   │   ├── context/               # React Context — Settings, Theme
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # Google Fonts and Custom Fonts API services
│   │   ├── utils/                 # fieldHelpers.js — conditional logic evaluation
│   │   └── App.jsx                # Root application component
│   └── scss/                      # SCSS source — 7-1 modular architecture
├── languages/                     # themeplus.pot + translations
├── themeplus.php                  # Plugin entry point — constants and bootstrap
├── uninstall.php                  # Clean removal of all plugin data
└── includes/class-themeplus.php   # Main singleton class and loader
```

---

## Adding a New Field Type

ThemePlus is designed to make adding field types straightforward. Every new field type requires changes in six places — follow all six steps to keep the framework consistent.

### 1. Create the React component

Add a new file in `src/js/admin/components/Fields/`:

```jsx
// src/js/admin/components/Fields/MyNewField.jsx
import { useState } from '@wordpress/element';

function MyNewField({ id, label, value = '', onChange, help = '' }) {
  return (
    <div className="tpo-field tpo-field--my-new-field">
      <div className="tpo-field__header">
        <label className="tpo-field__label" htmlFor={id}>{label}</label>
        {help && <p className="tpo-field__help">{help}</p>}
      </div>
      <div className="tpo-field__control">
        {/* Your field UI here */}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MyNewField;
```

**Important:** Do not copy the field's `value` prop into `useState` — derive directly from `value` and call `onChange` with the new value. Copying into state causes stale values after Reset and Import.

### 2. Export from the Fields index

Add your export to `src/js/admin/components/Fields/index.js`:

```js
export { default as MyNewField } from './MyNewField';
```

### 3. Register in FieldRenderer

Import and register in `src/js/admin/components/Common/FieldRenderer.jsx`:

```jsx
import { MyNewField } from '../Fields';

const fields = {
  // ...existing fields
  my_new_field: MyNewField,
};
```

### 4. Add SCSS styles

Create a partial in `src/scss/components/`:

```scss
// src/scss/components/_my-new-field.scss
.tpo-field--my-new-field {
  // Your styles here — use existing SCSS variables and mixins
}
```

Import it in `src/scss/admin.scss`:

```scss
@use 'components/my-new-field';
```

### 5. Register in ThemePlus_Sanitizer

Add a case to `includes/classes/core/class-themeplus-sanitizer.php` inside `sanitize_field()`:

```php
case 'my_new_field':
    return sanitize_text_field( (string) $value );
```

For structured values (arrays), follow the pattern of existing types like `sanitize_border()` or `sanitize_link()`. Without this step, the field falls back to `sanitize_text_field()` — safe for strings but incorrect for arrays.

### 6. Document the return value

Every field type must have a documented, consistent return value. In your PR description, include:

- What the field returns (scalar or array shape)
- The default value when nothing is saved
- A usage example in a theme template

---

## Coding Standards

### PHP

- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- PHP 8.0+ features are encouraged — type hints, union types, match expressions, named arguments
- All new classes use the singleton pattern consistent with existing core classes
- Use `str_contains()`, `str_starts_with()`, `str_ends_with()` over `strpos()` for PHP 8.0+
- Sanitize all input; escape all output — `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- Never use `extract()` or short PHP tags
- All user-facing strings use `__()` or `esc_html__()` with the `themeplus` text domain

**i18n convention:** ThemePlus translates its own strings with the `themeplus` domain. Any string passed in by a theme (via `themeplus_framework_config()` or `themeplus_add_section()`) is the theme's responsibility to translate in its own domain — the plugin treats these as opaque, already-translated strings.

### JavaScript / React

- Functional components only — no class components
- Use `@wordpress/element` for React imports (`import { useState } from '@wordpress/element'`), never `react` directly
- Derive field display from the `value` prop — never copy `value` into `useState` at mount
- Follow BEM naming: `.tpo-block__element--modifier`
- No jQuery — ever
- No `console.log()` in production code — guard dev logging with `isDev`

### SCSS

- Follow the 7-1 modular architecture in `src/scss/`
- One partial per component, prefixed with `_`
- Use existing variables and mixins from `src/scss/abstracts/`
- No hardcoded colour values — use CSS custom properties or SCSS variables

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat(fields): add DateRange field type
fix(conditions): correct empty operator for boolean false
refactor(sanitizer): extract sanitize_row() helper for repeater and group
docs(readme): update field value shapes table
chore(build): update vite to v7
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`

**Scopes** (optional but helpful): `fields`, `conditions`, `admin`, `rest`, `sanitizer`, `fonts`, `build`, `readme`

**Shell quoting note:** In zsh, use single quotes for commit messages containing `!` (e.g. `!empty`, `!contains`) — the `!` character triggers history expansion in double-quoted strings.

---

## Pull Request Process

1. **Fork** the repository and create your branch from `develop`:
   ```bash
   git checkout -b feat/your-feature-name develop
   ```

2. **Follow the coding standards** above

3. **Test thoroughly:**
   - Test in both dev mode (`THEMEPLUS_DEV=true`) and a production build (`npm run build && npm run blocks:build`)
   - Test Reset Section and Reset All — field values must update immediately without a page reload
   - Test Import — importing a JSON snapshot must restore all field values immediately
   - Test in both light and dark WordPress admin colour schemes

4. **For new field types:** run the ThemePlus Demo theme to verify your field appears in the All Values panel with the correct shape

5. **Run Plugin Check** against a built ZIP before submitting — target zero errors and zero warnings

6. **Open a pull request** against `develop` (not `main`) with:
   - A clear title
   - Description of the change and why it is needed
   - For new fields: the documented return value shape
   - Screenshots or recordings for UI changes
   - Notes on any breaking changes

7. **Be responsive** — PRs inactive for 30 days may be closed

---

## Reporting Bugs

Open an [issue](https://github.com/fronttheme/themeplus/issues) and include:

- ThemePlus version
- WordPress version
- PHP version
- Active theme name
- Steps to reproduce
- Expected vs actual behaviour
- Browser console errors or PHP error log output (if any)

---

## Requesting Features

Open an [issue](https://github.com/fronttheme/themeplus/issues) describing:

- The use case — what problem does this solve?
- Your proposed solution
- Any alternatives you considered

Feature requests with a clear use case are far more likely to be implemented.

---

Thank you for helping make ThemePlus better for the WordPress community.

Made with ❤️ by [Faruk Ahmed](https://farukdesign.com) · [fronttheme.com](https://fronttheme.com)
