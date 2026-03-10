/**
 * ThemePlus ButtonSet Field
 *
 * File: src/js/admin/components/Fields/ButtonSet.jsx
 */

import ButtonSet from '../Common/ButtonSet';

function ButtonSetField({
                          id,
                          label,
                          value,
                          onChange,
                          options = [],
                          help = '',
                        }) {
  return (
    <div className="tpo-field tpo-field--buttonset">
      <div className="tpo-field__header">
        <label className="tpo-field__label">
          {label}
        </label>
      </div>

      <div className="tpo-field__body">
        <ButtonSet
          value={value}
          onChange={onChange}
          options={options}
          showLabel={false}
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

export default ButtonSetField;