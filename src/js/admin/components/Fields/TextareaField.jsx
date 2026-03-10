/**
 * ThemePlus Textarea Field Component
 *
 * File: src/js/admin/components/Fields/TextareaField.jsx
 */

/**
 * Textarea Field Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.value Field value
 * @param {Function} props.onChange Change handler
 * @param {string} props.placeholder Placeholder text
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {number} props.rows Number of rows
 */
function TextareaField({
                         id,
                         label,
                         value,
                         onChange,
                         placeholder = '',
                         help = '',
                         required = false,
                         rows = 4,
                       }) {
  return (
    <div className="tpo-field tpo-field--textarea">
      <div className="tpo-field__header">
        <label htmlFor={id} className="tpo-field__label">
          {label}
          {required && <span className="tpo-field__required">*</span>}
        </label>
      </div>

      <div className="tpo-field__body">
                <textarea
                  id={id}
                  className="tpo-field__textarea"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  rows={rows}
                />
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default TextareaField;