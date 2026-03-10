# Contributing to ThemePlus

Thank you for your interest in contributing to ThemePlus! Contributions of all kinds are welcome — bug reports, feature requests, documentation improvements, and pull requests.

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

- **Report a bug** — Open an [issue](https://github.com/fronttheme/themeplus/issues) with a clear description and reproduction steps
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
- Local WordPress install (e.g. [LocalWP](https://localwp.com/), Laragon, MAMP)
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

> **Important:** `THEMEPLUS_DEV` must be the boolean `true` — not the string `"true"`.

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
├── assets/               # Compiled assets (do not edit directly)
│   ├── css/admin.css
│   ├── js/admin.js
│   └── fonts/fontawesome/
├── includes/
│   ├── classes/
│   │   ├── core/         # Framework core classes
│   │   └── custom-fonts/ # Custom Fonts module classes
│   ├── config/
│   │   ├── default-config.php   # Built-in sections (Custom Fonts, Import/Export, Dev Panel)
│   │   └── sample-config.php    # Copy-and-customize template for theme developers
│   └── functions/        # Helper and config public functions
├── src/
│   ├── js/admin/
│   │   ├── components/
│   │   │   ├── Fields/   # One file per field type
│   │   │   ├── Common/   # Shared UI components (FieldRenderer, Dialog, Select, etc.)
│   │   │   ├── Layout/   # Sidebar, Header, Body, Footer, MainWrapper
│   │   │   ├── Sections/ # Import/Export, Custom Font Uploader
│   │   │   └── DevPanel/ # Developer Panel components
│   │   ├── context/      # React Context providers (Settings, Theme)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # Google Fonts and Custom Fonts API services
│   │   ├── utils/        # fieldHelpers.js (conditional logic)
│   │   └── App.jsx       # Root application component
│   └── scss/             # SCSS source — 7-1 modular architecture
├── languages/            # .pot file and translations
├── themeplus.php         # Plugin entry point — constants and bootstrap
└── includes/class-themeplus.php  # Main singleton class
```

---

## Adding a New Field Type

ThemePlus is designed to make adding new field types straightforward. Follow these steps:

### 1. Create the React component

Add a new file in `src/js/admin/components/Fields/`:

```jsx
// src/js/admin/components/Fields/MyNewField.jsx

function MyNewField({ id, label, value, onChange, help, ...props }) {
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
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MyNewField;
```

### 2. Export from the Fields index

Add your export to `src/js/admin/components/Fields/index.js`:

```js
export { default as MyNewField } from './MyNewField';
```

### 3. Register in FieldRenderer

Import and register the component in `src/js/admin/components/Common/FieldRenderer.jsx`:

```jsx
import { MyNewField } from '../Fields';

// Inside the fields map object:
const fields = {
  // ...existing fields
  my_new_field: MyNewField,
};
```

### 4. Add SCSS styles

Create a new partial in `src/scss/components/`:

```scss
// src/scss/components/_my-new-field.scss
.tpo-field--my-new-field {
  // Your styles here
}
```

Import it in `src/scss/admin.scss`:

```scss
@use 'components/my-new-field';
```

### 5. Document the return type

If the field returns a non-obvious value type, document it clearly in your PR description — what it returns, in what format, and a usage example.

---

## Coding Standards

### PHP

- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Use PHP 8.0+ features where appropriate — type hints, match expressions, named arguments
- All new classes must use the singleton pattern consistent with existing core classes
- Use `str_contains()`, `str_starts_with()`, `str_ends_with()` instead of `strpos()` for PHP 8.0+
- Never use `extract()` or short PHP tags

### JavaScript / React

- All React components must be functional components — no class components
- Use `@wordpress/element` for React (`import { useState } from '@wordpress/element'`), not `react` directly
- Follow the BEM naming convention for CSS classes: `.tpo-block__element--modifier`
- Keep components focused — if a component exceeds ~200 lines, consider splitting it
- No jQuery — ever

### SCSS

- Follow the 7-1 modular architecture already established in `src/scss/`
- One partial per component, prefixed with `_`
- Use existing SCSS variables and mixins from `src/scss/abstracts/`
- No hardcoded colour values — use CSS custom properties or SCSS variables

### General

- No `console.log()` in production code — dev logging only (guarded by `isDev`)
- Escape all output in PHP — `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- Sanitize all input — `sanitize_text_field()`, `absint()`, etc.
- All user-facing strings must be wrapped in `__()` or `esc_html__()` with the `themeplus` text domain

---

## Commit Messages

Use clear, descriptive commit messages. Prefix with a type:

```
Add: Typography field Google Fonts live preview
Fix: Conditional logic not evaluating nested OR conditions correctly
Update: SliderField min/max/step now accept float values
Remove: Deprecated themeplus_get_all_options() function
Docs: Add Repeater field usage example to README
Refactor: Split ThemePlus_Admin into Admin and AssetLoader classes
```

---

## Pull Request Process

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards above

3. **Test thoroughly** — test in both dev mode and production build, and across light/dark admin colour schemes

4. **Build for production** before submitting:
   ```bash
   npm run build && npm run blocks:build
   ```

5. **Open a pull request** against the `main` branch with:
   - A clear title describing what the PR does
   - A description of the change and why it is needed
   - Screenshots or screen recordings for any UI changes
   - Notes on any breaking changes

6. **Be responsive** — address review feedback promptly. PRs inactive for 30 days may be closed.

---

## Reporting Bugs

Please open an [issue](https://github.com/fronttheme/themeplus/issues) and include:

- ThemePlus version
- WordPress version
- PHP version
- Active theme name
- Clear steps to reproduce the bug
- What you expected to happen vs. what actually happened
- Any relevant error messages from the browser console or PHP error log

---

## Requesting Features

Open an [issue](https://github.com/fronttheme/themeplus/issues) describing:

- The use case — what problem does this solve?
- Your proposed solution
- Any alternative approaches you considered

Feature requests with a clear use case are far more likely to be considered and implemented.

---

Thank you for helping make ThemePlus better for the entire WordPress community.

Made with ❤️ by [Faruk Ahmed](https://farukdesign.com) · [fronttheme.com](https://fronttheme.com)