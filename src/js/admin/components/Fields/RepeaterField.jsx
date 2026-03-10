/**
 * ThemePlus Repeater Field - Dynamic Row Builder
 * Add/remove/reorder rows with nested fields
 *
 * File: src/js/admin/components/Fields/RepeaterField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import FieldRenderer from '../Common/FieldRenderer';
import Button from "../Common/Button";
import FileUpload from "../Common/FileUpload";

function RepeaterField({
                         id,
                         label,
                         value = [],
                         onChange,
                         fields = [],
                         help = '',
                         min = 0,
                         max = 999,
                         button_label = __('Add Item', 'themeplus'),
                         showModal, // Modal function from parent
                       }) {
  const [rows, setRows] = useState(value);
  const [collapsed, setCollapsed] = useState({});

  /**
   * Add new row
   */
  const addRow = () => {
    if (rows.length >= max) return;

    const newRow = {};
    fields.forEach(field => {
      newRow[field.id] = field.default || '';
    });

    const newRows = [...rows, newRow];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Remove row with custom modal confirmation
   */
  const removeRow = (index) => {
    if (rows.length <= min) return;

    // Use custom modal instead of browser confirm
    if (showModal) {
      showModal({
        type: 'confirm',
        title: __('Remove Item?', 'themeplus'),
        message: __('Are you sure you want to remove this item? This action cannot be undone.', 'themeplus'),
        confirmText: __('Remove', 'themeplus'),
        cancelText: __('Cancel', 'themeplus'),
        onConfirm: () => {
          const newRows = rows.filter((_, i) => i !== index);
          setRows(newRows);
          onChange(newRows);
        }
      });
    } else {
      // Fallback to browser confirm if showModal not available
      if (confirm(__('Are you sure you want to remove this item?', 'themeplus'))) {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
        onChange(newRows);
      }
    }
  };

  /**
   * Update row field value
   * Uses currying like GroupField
   */
  const updateRow = (rowIndex, fieldId) => (fieldValue) => {
    const newRows = [...rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [fieldId]: fieldValue,
    };
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Move row up
   */
  const moveRowUp = (index) => {
    if (index === 0) return;

    const newRows = [...rows];
    [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Move row down
   */
  const moveRowDown = (index) => {
    if (index === rows.length - 1) return;

    const newRows = [...rows];
    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Toggle row collapse
   */
  const toggleCollapse = (index) => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  /**
   * Get row title (from first text field or index)
   */
  const getRowTitle = (row, index) => {
    const firstTextField = fields.find(f => f.type === 'text' || f.type === 'textarea');
    if (firstTextField && row[firstTextField.id]) {
      const title = row[firstTextField.id];
      return title.length > 30 ? title.substring(0, 30) + '...' : title;
    }
    return `${__('Item', 'themeplus')} ${index + 1}`;
  };

  /**
   * Generate unique field ID for nested fields
   * Fixes the duplicate ID warning!
   */
  const getUniqueFieldId = (fieldId, rowIndex) => {
    return `${id}-row-${rowIndex}-${fieldId}`;
  };

  return (
    <div className="tpo-field tpo-field--repeater">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
          {rows.length > 0 && (
            <span className="tpo-field__counter">
              {rows.length} {rows.length === 1 ? __('item', 'themeplus') : __('items', 'themeplus')}
            </span>
          )}
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-repeater">
          {/* Rows */}
          {rows.length > 0 && (
            <div className="tpo-repeater__rows">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className={`tpo-repeater__row tpo-field-card ${collapsed[index] ? 'tpo-repeater__row--collapsed' : ''}`}
                >
                  {/* Row header */}
                  <div className="tpo-repeater__row-header">
                    <Button
                      color="light"
                      iconOnly={true}
                      onClick={() => toggleCollapse(index)}
                      title={collapsed[index] ? __('Expand', 'themeplus') : __('Collapse', 'themeplus')}
                      ariaLabel={collapsed[index] ? __('Expand', 'themeplus') : __('Collapse', 'themeplus')}>
                      <i className={`fa-solid fa-chevron-${collapsed[index] ? 'right' : 'down'}`}></i>
                    </Button>

                    <div className="tpo-repeater__row-title">
                      {getRowTitle(row, index)}
                    </div>

                    <div className="tpo-repeater__row-actions tpo-actions-bar">
                      {/* Move up */}
                      <Button
                        color="muted"
                        onClick={() => moveRowUp(index)}
                        disabled={index === 0}
                        title={__('Move up', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Move up', 'themeplus')}>
                        <i className="fa-solid fa-chevron-up"></i>
                      </Button>

                      {/* Move down */}
                      <Button
                        color="muted"
                        onClick={() => moveRowDown(index)}
                        disabled={index === rows.length - 1}
                        title={__('Move down', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Move down', 'themeplus')}>
                        <i className="fa-solid fa-chevron-down"></i>
                      </Button>

                      {/* Duplicate */}
                      <Button
                        color="muted"
                        onClick={() => {
                          if (rows.length >= max) return;
                          const newRows = [...rows];
                          newRows.splice(index + 1, 0, {...row});
                          setRows(newRows);
                          onChange(newRows);
                        }}
                        disabled={rows.length >= max}
                        title={__('Duplicate', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Duplicate', 'themeplus')}>
                        <i className="fa-solid fa-copy"></i>
                      </Button>

                      {/* Remove */}
                      <Button
                        color="danger"
                        onClick={() => removeRow(index)}
                        disabled={rows.length <= min}
                        title={__('Remove', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Remove', 'themeplus')}>
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
                  </div>

                  {/* Row content (fields) */}
                  {!collapsed[index] && (
                    <div className="tpo-repeater__row-content">
                      {fields.map(field => {
                        // Create unique field with proper ID
                        const uniqueField = {
                          ...field,
                          id: getUniqueFieldId(field.id, index),
                        };

                        return (
                          <div key={field.id} className="tpo-repeater__field">
                            <FieldRenderer
                              field={uniqueField}
                              value={row[field.id]}
                              onUpdate={updateRow(index, field.id)}
                              showModal={showModal}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add button */}
          <FileUpload
            variant="button"
            icon="fa-plus"
            label={
              <>
                {button_label}
                {max < 999 && (
                  <span className="tpo-repeater__add-limit">
                    ({rows.length}/{max})
                  </span>
                )}
              </>
            }
            onClick={addRow}
            disabled={rows.length >= max}
            className="tpo-repeater__add"
          />

          {/* Info message */}
          {rows.length === 0 && (
            <div className="tpo-repeater__empty">
              <i className="fa-regular fa-face-meh-blank"></i>
              <p>{__('No items yet. Click the button above to add one.', 'themeplus')}</p>
            </div>
          )}
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

export default RepeaterField;