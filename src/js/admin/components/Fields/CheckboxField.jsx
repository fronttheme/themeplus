/**
 * ThemePlus Checkbox Field
 *
 * File: src/js/admin/components/Fields/CheckboxField.jsx
 */

import Checkbox from '../Common/Checkbox';

function CheckboxField({
                         id,
                         label,
                         value = [],
                         onChange,
                         options = {},
                         help = '',
                         layout = 'vertical',
                         size = 'medium',
                         compact = false,
                       }) {
  const handleChange = (optionValue, checked) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(item => item !== optionValue));
    }
  };

  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(option => {
        if (typeof option === 'object' && option.value && option.label) {
          return {value: option.value, label: option.label};
        }
        return {value: option, label: option};
      });
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

  const checkboxGroupClasses = [
    'tpo-checkbox-group',
    `tpo-checkbox-group--${layout}`,
    `tpo-checkbox-group--${size}`,
    compact ? 'tpo-checkbox-group--compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="tpo-field tpo-field--checkbox">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className={checkboxGroupClasses}>
          {normalizedOptions.map((option) => (
            <Checkbox
              key={option.value}
              id={`${id}-${option.value}`}
              checked={value.includes(option.value)}
              onChange={(checked) => handleChange(option.value, checked)}
              label={option.label}
              size={size}
            />
          ))}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default CheckboxField;