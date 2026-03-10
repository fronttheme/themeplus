/**
 * ThemePlus Border Field
 *
 * File: src/js/admin/components/Fields/BorderField.jsx
 */

import {__} from '@wordpress/i18n';
import Select from '../Common/Select';
import ColorPickerButton from '../Common/ColorPickerButton';
import Spinner from '../Common/Spinner';

function BorderField({id, label, value = {}, onChange, help = ''}) {
  const border = {
    width: value.width ?? 4,
    style: value.style || 'solid',
    color: value.color || '#9097ad',
    radius: value.radius ?? 8,
  };

  const updateBorder = (key, val) => {
    const newBorder = {...border, [key]: val};
    onChange(newBorder);
  };

  return (
    <div className="tpo-field tpo-field--border">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-border tpo-field-card">
          <div className="tpo-border__controls">
            {/* Width - Using Spinner */}
            <div className="tpo-border__control">
              <label className="tpo-border__label">
                {__('Width', 'themeplus')}
              </label>
              <Spinner
                value={border.width}
                onChange={(val) => updateBorder('width', val)}
                min={0}
                max={20}
                step={1}
                unit="px"
              />
            </div>

            {/* Style */}
            <div className="tpo-border__control">
              <label className="tpo-border__label">
                {__('Style', 'themeplus')}
              </label>
              <Select
                value={border.style}
                onChange={(val) => updateBorder('style', val)}
                options={[
                  {label: __('Solid', 'themeplus'), value: 'solid'},
                  {label: __('Dashed', 'themeplus'), value: 'dashed'},
                  {label: __('Dotted', 'themeplus'), value: 'dotted'},
                  {label: __('Double', 'themeplus'), value: 'double'},
                ]}
                className="tpo-border__select"
              />
            </div>

            {/* Color - Using ColorPickerButton */}
            <div className="tpo-border__control">
              <label className="tpo-border__label">
                {__('Color', 'themeplus')}
              </label>
              <ColorPickerButton
                value={border.color}
                onChange={(color) => updateBorder('color', color)}
                ariaLabel={__('Pick border color', 'themeplus')}
              />
            </div>

            {/* Radius - Using Spinner */}
            <div className="tpo-border__control">
              <label className="tpo-border__label">
                {__('Radius', 'themeplus')}
              </label>
              <Spinner
                value={border.radius}
                onChange={(val) => updateBorder('radius', val)}
                min={0}
                max={100}
                step={1}
                unit="px"
              />
            </div>
          </div>

          {/* Preview */}
          <div
            className="tpo-border__preview"
            style={{
              borderWidth: `${border.width}px`,
              borderStyle: border.style,
              borderColor: border.color,
              borderRadius: `${border.radius}px`,
            }}
          >
            {__('Preview', 'themeplus')}
          </div>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default BorderField;