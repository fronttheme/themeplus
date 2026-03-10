/**
 * ThemePlus Reusable Radio Component
 *
 * File: src/js/admin/components/Common/Radio.jsx
 */

function Radio({
                 id,
                 name,
                 value,
                 checked = false,
                 onChange,
                 label,
                 disabled = false,
                 size = 'medium', // 'small' | 'medium' | 'large'
                 className = '',
               }) {
  const sizeClass = `tpo-radio--${size}`;
  const disabledClass = disabled ? 'tpo-radio--disabled' : '';
  const checkedClass = checked ? 'tpo-radio--checked' : '';

  return (
    <label
      htmlFor={id}
      className={`tpo-radio ${sizeClass} ${disabledClass} ${checkedClass} ${className}`.trim()}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="tpo-radio__input"
      />
      <span className="tpo-radio__indicator"/>
      {label && (
        <span className="tpo-radio__label">{label}</span>
      )}
    </label>
  );
}

export default Radio;