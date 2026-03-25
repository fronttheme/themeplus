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
                       on = '',
                       off = '',
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
          className={`tpo-toggle ${value ? 'tpo-toggle--active' : ''} ${!on && !off ? 'tpo-toggle--no-labels' : ''}`}
          onClick={() => onChange(!value)}
          role="switch"
          aria-checked={value}
          aria-label={label}>
          <span className="tpo-toggle__track">
            {on && (
              <span className="tpo-toggle__label tpo-toggle__label--on">
                {on}
              </span>
            )}
            <span className="tpo-toggle__thumb"/>
            {off && (
              <span className="tpo-toggle__label tpo-toggle__label--off">
                {off}
              </span>
            )}
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