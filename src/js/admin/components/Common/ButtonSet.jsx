/**
 * ThemePlus Reusable ButtonSet Component
 *
 * File: src/js/admin/components/Common/ButtonSet.jsx
 */

/**
 * ButtonSet Component
 *
 * @param {Object} props Component props
 * @param {string} props.label Field label (optional)
 * @param {string} props.value Selected value
 * @param {Function} props.onChange Change handler
 * @param {Array|Object} props.options Button options
 * @param {string} props.className Additional CSS class
 * @param {boolean} props.showLabel Show label or not
 */
function ButtonSet({
                     label = '',
                     value,
                     onChange,
                     options = [],
                     className = '',
                     showLabel = true,
                   }) {
  /**
   * Normalize options to array format
   * Handles:
   * - Array: [{value: 'left', label: 'Left'}, ...]
   * - Object: {left: 'Left', right: 'Right'}
   */
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options;
    }

    if (typeof options === 'object' && options !== null) {
      return Object.entries(options).map(([key, label]) => ({
        value: key,
        label: label,
      }));
    }

    return [];
  };

  const normalizedOptions = normalizeOptions();

  return (
    <div className={`tpo-field--component tpo-buttonset-wrapper ${className}`}>
      {showLabel && label && (
        <label className="tpo-buttonset__label tpo-field__label--depth0">
          {label}
        </label>
      )}

      <div
        className="tpo-buttonset tpo-field-group--buttonset"
        role="group"
        aria-label={label}
      >
        {normalizedOptions.map((option) => {
          const optionValue = option.value || option;
          const optionLabel = option.label || option;
          const isActive = value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              className={`tpo-buttonset__button ${
                isActive ? 'tpo-buttonset__button--active' : ''
              }`}
              onClick={() => onChange(optionValue)}
              aria-pressed={isActive}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonSet;