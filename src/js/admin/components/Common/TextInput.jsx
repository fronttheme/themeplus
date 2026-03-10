/**
 * ThemePlus TextInput Component
 * Reusable text input for forms and fields
 *
 * File: src/js/admin/components/Common/TextInput.jsx
 */

/**
 * TextInput Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Input ID
 * @param {string} props.label Input label
 * @param {string} props.value Input value
 * @param {Function} props.onChange Change handler
 * @param {string} props.type Input type (text, email, url, number, password, etc)
 * @param {string} props.placeholder Placeholder text
 * @param {string} props.help Help text below input
 * @param {boolean} props.required Required field
 * @param {boolean} props.disabled Disabled state
 * @param {string} props.size Input size (small, medium, large)
 * @param {boolean} props.fullWidth Full width input
 * @param {React.ReactNode} props.prefix Prefix icon or text
 * @param {React.ReactNode} props.suffix Suffix icon or button
 * @param {string} props.className Additional CSS classes
 * @param {number} props.maxLength Maximum character length
 * @param {string} props.pattern HTML5 pattern validation
 * @param {string} props.autoComplete Autocomplete attribute
 */
function TextInput({
                     id,
                     label,
                     value = '',
                     onChange,
                     type = 'text',
                     placeholder = '',
                     help = '',
                     required = false,
                     disabled = false,
                     size = 'medium',
                     fullWidth = false,
                     prefix,
                     suffix,
                     className = '',
                     maxLength,
                     pattern,
                     autoComplete,
                     ...props
                   }) {
  const inputClasses = [
    'tpo-text-input',
    `tpo-text-input--${size}`,
    fullWidth && 'tpo-text-input--full-width',
    disabled && 'tpo-text-input--disabled',
    prefix && 'tpo-text-input--has-prefix',
    suffix && 'tpo-text-input--has-suffix',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="tpo-text-input-wrapper">
      {/* Label */}
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label tpo-text-input__label">
            {label}
            {required && <span className="tpo-field__required tpo-text-input__required">*</span>}
          </label>
        </div>
      )}

      {/* Input Container */}
      <div className="tpo-field__body tpo-text-input__container">
        {/* Prefix */}
        {prefix && (
          <div className="tpo-text-input__prefix">
            {prefix}
          </div>
        )}

        {/* Input */}
        <input
          id={id}
          type={type}
          className={inputClasses}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          pattern={pattern}
          autoComplete={autoComplete}
          {...props}
        />

        {/* Suffix */}
        {suffix && (
          <div className="tpo-text-input__suffix">
            {suffix}
          </div>
        )}
      </div>

      {/* Help Text */}
      {help && (
        <div className="tpo-text-input__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default TextInput;