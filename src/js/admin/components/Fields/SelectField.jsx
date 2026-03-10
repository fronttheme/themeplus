/**
 * ThemePlus Select Field Component
 * Field wrapper for Select component in theme options
 *
 * File: src/js/admin/components/Fields/SelectField.jsx
 */

import Select from '../Common/Select';

/**
 * Select Field Component (with label, help text, etc.)
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.value Selected value
 * @param {Function} props.onChange Change handler
 * @param {Array|Object} props.options Select options
 * @param {string} props.subtitle Subtitle/description
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {boolean} props.disabled Disabled state
 * @param {string} props.placeholder Placeholder text
 */
function SelectField({
                       id,
                       label,
                       value,
                       onChange,
                       options = [],
                       subtitle = '',
                       help = '',
                       required = false,
                       disabled = false,
                       placeholder,
                     }) {
  return (
    <div className="tpo-field tpo-field--select">
      {/* Field Header */}
      <div className="tpo-field__header">
        <label htmlFor={id} className="tpo-field__label">
          {label}
          {required && <span className="tpo-field__required">*</span>}
        </label>
        {subtitle && (
          <p className="tpo-field__subtitle">{subtitle}</p>
        )}
      </div>

      {/* Field Body */}
      <div className="tpo-field__body">
        <Select
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>

      {/* Field Help */}
      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default SelectField;