/**
 * ThemePlus Button Component
 * Universal button for consistent UI across the plugin
 *
 * File: src/js/admin/components/Common/Button.jsx
 */

import {Children} from '@wordpress/element';

/**
 * Button Component
 *
 * @param {Object} props Component props
 * @param {string} props.style Button visual style
 *   - solid: Filled background (default)
 *   - outline: Outlined with transparent background
 *   - plain: No border, transparent background
 * @param {string} props.color Button semantic color
 *   - primary
 *   - secondary
 *   - light
 *   - success
 *   - danger
 *   - warning
 *   - info
 *   - muted
 *   - gradient
 * @param {string} props.size Button size
 *   - small: Compact button (28px)
 *   - medium: Default size (36px)
 *   - large: Prominent button (48px)
 *   - auto: Inherits height from parent/sibling
 * @param {boolean} props.iconOnly Icon-only button (no text, just icon)
 * @param {string} props.ariaLabel Accessibility label (required for iconOnly buttons)
 * @param {boolean} props.loading Loading state with spinner
 * @param {boolean} props.disabled Disabled state
 * @param {boolean} props.fullWidth Full width button
 * @param {Function} props.onClick Click handler
 * @param {React.ReactNode} props.children Button content (text, icon, or both)
 * @param {string} props.type Button type (button, submit, reset)
 * @param {string} props.className Additional CSS classes
 */
function Button({
                  style = 'solid',
                  color = 'primary',
                  size = 'medium',
                  iconOnly = false,
                  ariaLabel,
                  loading = false,
                  disabled = false,
                  fullWidth = false,
                  onClick,
                  children,
                  type = 'button',
                  className = '',
                  ...props
                }) {
  // Detect if button contains only an icon
  const hasOnlyIcon = (() => {
    if (iconOnly) return true;

    // Check if children is a single <i> element
    const childArray = Children.toArray(children);
    if (childArray.length === 1) {
      const child = childArray[0];
      if (child?.type === 'i' || child?.props?.className?.includes('fa-')) {
        return true;
      }
    }
    return false;
  })();

  // Build class names
  const classNames = [
    'tpo-button',
    `tpo-button--${style}`,
    `tpo-button--${color}`,
    `tpo-button--${size}`,
    hasOnlyIcon && 'tpo-button--icon-only',
    fullWidth && 'tpo-button--full-width',
    loading && 'tpo-button--loading',
    disabled && 'tpo-button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel || props['aria-label']}
      {...props}
    >
      {loading && (
        <span className="tpo-button__spinner">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </span>
      )}
      <span className="tpo-button__content">{children}</span>
    </button>
  );
}

export default Button;