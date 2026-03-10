/**
 * ThemePlus Radio Field
 *
 * File: src/js/admin/components/Fields/RadioField.jsx
 */

import Radio from '../Common/Radio';

function RadioField({
                      id,
                      label,
                      value = '',
                      onChange,
                      options = [],
                      help = '',
                      layout = 'vertical',
                      size = 'medium',
                      compact = false,
                    }) {
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(option => {
        if (typeof option === 'object' && option.value && option.label) {
          return option;
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

  const radioGroupClasses = [
    'tpo-radio-group',
    `tpo-radio-group--${layout}`,
    `tpo-radio-group--${size}`,
    compact ? 'tpo-radio-group--compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="tpo-field tpo-field--radio">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className={radioGroupClasses}>
          {normalizedOptions.map((option, index) => (
            <Radio
              key={option.value || index}
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
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

export default RadioField;