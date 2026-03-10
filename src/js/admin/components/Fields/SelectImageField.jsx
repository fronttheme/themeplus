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
          {options.map((option) => {
            const optionValue = option.value || option;
            const optionLabel = option.label || option;
            const optionImage = option.image || option.img || '';
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