/**
 * ThemePlus Number Field Component
 * Unified field for both simple number input and spinner (with +/- buttons)
 *
 * File: src/js/admin/components/Fields/NumberField.jsx
 */

import Spinner from '../Common/Spinner';

/**
 * Round number to specific decimal places
 * JavaScript floating point precision
 */
const roundToStep = (value, step) => {
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
};

/**
 * Number Field Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.subtitle Field subtitle/description
 * @param {number} props.value Field value
 * @param {Function} props.onChange Change handler
 * @param {number} props.min Minimum value
 * @param {number} props.max Maximum value
 * @param {number} props.step Step increment (default: 1)
 * @param {string} props.unit Unit label (px, %, em, etc.)
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {boolean} props.spinner Show spinner buttons (default: auto-detect)
 * @param {boolean} props.disabled Disabled state
 */
function NumberField({
                       id,
                       label,
                       subtitle = '',
                       value = 0,
                       onChange,
                       min = 0,
                       max = 100,
                       step = 1,
                       unit = '',
                       help = '',
                       required = false,
                       spinner = null, // null = auto-detect, true = force, false = disable
                       disabled = false,
                     }) {

  // Auto-detect if spinner should be shown
  // Show spinner if: small range (max - min <= 1000) OR step is decimal
  const shouldShowSpinner = spinner !== null
    ? spinner
    : (max - min <= 1000 || step < 1);

  const handleChange = (newValue) => {
    // Handle empty string
    if (newValue === '' || newValue === '-') {
      onChange(newValue);
      return;
    }

    const numValue = Number(newValue);

    // Validate
    if (isNaN(numValue)) return;

    // Clamp
    let clampedValue = numValue;
    if (clampedValue < min) clampedValue = min;
    if (clampedValue > max) clampedValue = max;

    // Round to step precision
    const roundedValue = roundToStep(clampedValue, step);

    onChange(roundedValue);
  };

  const handleBlur = () => {
    // Clean up on blur
    if (value === '' || value === '-' || value === null || value === undefined || isNaN(value)) {
      onChange(min);
    }
  };

  return (
    <div className="tpo-field tpo-field--number">
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label">
            {label}
            {required && <span className="tpo-field__required">*</span>}
          </label>
          {subtitle && (
            <p className="tpo-field__subtitle">{subtitle}</p>
          )}
        </div>
      )}

      <div className="tpo-field__body">
        {shouldShowSpinner ? (
          // Spinner mode (with +/- buttons)
          <Spinner
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            unit={unit}
            disabled={disabled}
          />
        ) : (
          // Simple mode (plain input)
          <div className="tpo-number">
            <input
              id={id}
              type="number"
              className="tpo-number__input"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              min={min}
              max={max}
              step={step}
              required={required}
              disabled={disabled}
              autoComplete="off"
            />
            {unit && (
              <span className="tpo-number__unit tpo-field-unit">{unit}</span>
            )}
          </div>
        )}
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default NumberField;