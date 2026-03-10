/**
 * ThemePlus Reusable Checkbox Component
 *
 * File: src/js/admin/components/Common/Checkbox.jsx
 */

function Checkbox({
                    id,
                    checked = false,
                    onChange,
                    label,
                    disabled = false,
                    size = 'medium', // 'small' | 'medium' | 'large'
                    className = '',
                  }) {
  const sizeClass = `tpo-checkbox--${size}`;
  const disabledClass = disabled ? 'tpo-checkbox--disabled' : '';
  const checkedClass = checked ? 'tpo-checkbox--checked' : '';

  return (
    <label
      htmlFor={id}
      className={`tpo-checkbox ${sizeClass} ${disabledClass} ${checkedClass} ${className}`.trim()}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="tpo-checkbox__input"
      />
      <span className="tpo-checkbox__indicator">
        <svg className="tpo-checkbox__check" viewBox="0 0 12 10" width="12" height="10">
          <polyline points="1.5 6 4.5 9 10.5 1"/>
        </svg>
      </span>
      {label && (
        <span className="tpo-checkbox__label">{label}</span>
      )}
    </label>
  );
}

export default Checkbox;