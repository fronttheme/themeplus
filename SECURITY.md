# Security Policy

## Supported Versions

Only the latest stable release of ThemePlus receives security updates.

| Version | Supported |
|---|---|
| 1.0.x (latest) | ✅ |
| < 1.0.0 | ❌ |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in ThemePlus, please report it responsibly by emailing:

📧 **[hellofronttheme@gmail.com](mailto:hellofronttheme@gmail.com)**

Please include the subject line: `[Security] ThemePlus Vulnerability Report`

### What to Include

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Your WordPress and PHP version
- Any proof-of-concept code if applicable

### What to Expect

- **Acknowledgement** within 48 hours
- **Assessment** of severity and scope within 5 business days
- **Fix** released as soon as possible depending on severity
- **Credit** in the changelog if you wish, once the issue is resolved

We appreciate responsible disclosure and will work with you to address the issue promptly.

---

## Security Best Practices When Using ThemePlus

- Always keep ThemePlus updated to the latest version
- Ensure your WordPress installation and PHP are up to date
- Only grant `manage_options` capability to trusted administrators — the ThemePlus REST API and admin interface require this capability
- Always escape output when displaying option values in your theme (`esc_html()`, `esc_url()`, `wp_kses_post()`, etc.)
- Set a unique `opt_name` per theme in `themeplus_framework_config()` — shared option keys between themes will cause settings to collide in the database