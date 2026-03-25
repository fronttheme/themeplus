/**
 * ThemePlus Select Image Field - Visual radio selector
 * Choose between options using images (layouts, styles, etc.)
 *
 * File: src/js/admin/components/Fields/SectionImageField.jsx
 */

function SelectImageField({
                            id,
                            label,
                            value = '',
                            onChange,
                            options = [],
                            help = '',
                          }) {
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(opt => ({
        value: opt.value,
        label: opt.label,
        image: opt.image || opt.img || '',
      }));
    }
    return Object.entries(options).map(([key, opt]) => ({
      value: key,
      label: opt.label || opt.alt || '',
      image: opt.image || opt.img || '',
    }));
  };

  const normalizedOptions = normalizeOptions();

  return (
    <div className="tpo-field tpo-field--select-image">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-select-image">
          {normalizedOptions.map((option) => {
            const {
              value: optionValue,
              label: optionLabel,
              image: optionImage
            } = option;
            const isSelected = value === optionValue;

            return (
              <label
                key={optionValue}
                className={`tpo-select-image__option ${isSelected ? 'tpo-select-image__option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name={id}
                  value={optionValue}
                  checked={isSelected}
                  onChange={() => onChange(optionValue)}
                  className="tpo-select-image__input"
                />

                {optionImage && (
                  <div className="tpo-select-image__image">
                    <img
                      src={optionImage}
                      alt={optionLabel}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="tpo-select-image__label">
                  {optionLabel}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default SelectImageField;