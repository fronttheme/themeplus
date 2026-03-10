/**
 * ThemePlus ToggleField Component
 *
 * File: src/js/admin/components/Fields/ToggleField.jsx
 */

function ToggleField({
                       id,
                       label,
                       value = false,
                       onChange,
                       help = '',
                     }) {
  return (
    <div className="tpo-field tpo-field--toggle">
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <button
          id={id}
          type="button"
          className={`tpo-toggle ${value ? 'tpo-toggle--active' : ''}`}
          onClick={() => onChange(!value)}
          role="switch"
          aria-checked={value}
          aria-label={label}
        >
                    <span className="tpo-toggle__track">
                        <span className="tpo-toggle__thumb"/>
                    </span>
        </button>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default ToggleField;