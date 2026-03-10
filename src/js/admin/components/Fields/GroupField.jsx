/**
 * ThemePlus Group Field
 * Container for nested fields
 *
 * File: src/js/admin/components/Fields/GroupField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import FieldRenderer from '../Common/FieldRenderer';

function GroupField({id, label, value = {}, onChange, fields = [], help = '', showModal}) {
  const [groupValues, setGroupValues] = useState(value);

  /**
   * Update nested field value
   * Accepts just the value (not fieldId)
   */
  const updateField = (fieldId) => (fieldValue) => {
    const newValues = {...groupValues, [fieldId]: fieldValue};
    setGroupValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="tpo-field tpo-field--group">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label--depth0 tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-group tpo-field-card tpo-fields--group">
          {fields.length > 0 ? (
            fields.map(field => (
              <div key={field.id} className="tpo-group__field">
                <FieldRenderer
                  field={field}
                  value={groupValues[field.id]}
                  onUpdate={updateField(field.id)}
                />
              </div>
            ))
          ) : (
            <div className="tpo-group__empty">
              <i className="fas fa-inbox"/>
              <p>{__('No fields configured for this group.', 'themeplus')}</p>
            </div>
          )}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default GroupField;