/**
 * ThemePlus Spinner Component - Reusable Number Input with +/- Buttons
 *
 * File: src/js/admin/components/Common/Spinner.jsx
 */

import {__} from '@wordpress/i18n';

/**
 * Round number to specific decimal places
 * JavaScript floating point precision
 */
const roundToStep = (value, step) => {
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
};

/**
 * Spinner Component
 *
 * @param {Object} props
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {number} props.min - Minimum value (default: 0)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {number} props.step - Step increment (default: 1)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.unit - Unit label (px, em, %, etc)
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.disabled - Disabled state
 */
function Spinner({
                   value = 0,
                   onChange,
                   min = 0,
                   max = 100,
                   step = 1,
                   placeholder = '',
                   unit = '',
                   className = '',
                   disabled = false,
                 }) {
  const handleIncrement = () => {
    if (disabled) return;
    const rawValue = Number(value) + step;
    const clampedValue = Math.min(rawValue, max);
    const roundedValue = roundToStep(clampedValue, step);
    onChange(roundedValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const rawValue = Number(value) - step;
    const clampedValue = Math.max(rawValue, min);
    const roundedValue = roundToStep(clampedValue, step);
    onChange(roundedValue);
  };

  const handleInputChange = (e) => {
    if (disabled) return;

    let newValue = e.target.value;

    // Allow empty string for user to type
    if (newValue === '') {
      onChange('');
      return;
    }

    // Allow negative sign for typing
    if (newValue === '-') {
      onChange('-');
      return;
    }

    newValue = Number(newValue);

    // Invalid number
    if (isNaN(newValue)) {
      return;
    }

    // Clamp value between min and max
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    // Round to step precision
    const roundedValue = roundToStep(newValue, step);

    onChange(roundedValue);
  };

  const handleBlur = () => {
    // If empty or invalid on blur, set to min value
    if (value === '' || value === '-' || value === null || value === undefined || isNaN(value)) {
      onChange(min);
      return;
    }

    // Round to step precision on blur
    const roundedValue = roundToStep(Number(value), step);
    onChange(roundedValue);
  };

  return (
    <div className={`tpo-spinner ${className}`}>
      {/* Wrapper 1: Field with buttons */}
      <div className="tpo-spinner__field">
        {/* Decrement Button */}
        <button
          type="button"
          className="tpo-spinner__button tpo-spinner__button--decrement"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label={__('Decrease', 'themeplus')}
        >
          <i className="fa-solid fa-minus"></i>
        </button>

        {/* Input */}
        <input
          type="number"
          className="tpo-spinner__input"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />

        {/* Increment Button */}
        <button
          type="button"
          className="tpo-spinner__button tpo-spinner__button--increment"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label={__('Increase', 'themeplus')}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {/* Wrapper 2: Unit (if provided) */}
      {unit && (
        <div className="tpo-spinner__unit-wrapper">
          <span className="tpo-spinner__unit tpo-field-unit">
            {unit}
          </span>
        </div>
      )}
    </div>
  );
}

export default Spinner;