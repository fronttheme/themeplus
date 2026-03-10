/**
 * ThemePlus Gradient Picker Field
 *
 * File: src/js/admin/components/Fields/GradientPickerField.jsx
 */

import GradientPicker from '../Common/GradientPicker';

function GradientPickerField({
                               id,
                               label,
                               value = '',
                               onChange,
                               help = '',
                             }) {
  return (
    <div className="tpo-field tpo-field--gradient-picker">
      <div className="tpo-field__header">
        <label className="tpo-field__label">
          {label}
        </label>
      </div>

      <div className="tpo-field__body">
        <div className="tpo-field-card">
          <GradientPicker
            value={value}
            onChange={onChange}
            showPreview={true}
            showCopyButton={true}
            showOutput={true}
          />
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

export default GradientPickerField;