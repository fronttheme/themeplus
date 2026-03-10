/**
 * ThemePlus ColorPicker Field Component
 *
 * File: src/js/admin/components/Fields/ColorPicker.jsx
 */

import ColorPickerButton from '../Common/ColorPickerButton';

function ColorPicker({
                       id,
                       label,
                       value = '#000000',
                       onChange,
                       help = '',
                     }) {
  return (
    <div className="tpo-field tpo-field--color">
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <ColorPickerButton
          value={value}
          onChange={onChange}
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

export default ColorPicker;