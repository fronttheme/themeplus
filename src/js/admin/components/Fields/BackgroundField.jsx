/**
 * ThemePlus Background Field
 * Supports dynamic options: color, image, gradient, etc.
 *
 * File: src/js/admin/components/Fields/BackgroundField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import ButtonSet from '../Common/ButtonSet';
import ColorPickerButton from '../Common/ColorPickerButton';
import ImageField from './ImageField';
import Select from "../Common/Select";
import GradientPicker from '../Common/GradientPicker';

function BackgroundField({
                           id,
                           label,
                           value = {},
                           onChange,
                           help = '',
                           // Dynamic options
                           color = true,
                           image = false,
                           gradient = false,
                           // Image options (only if image = true)
                           position = true,
                           size = true,
                           repeat = true,
                           attachment = true,
                         }) {
  // Determine available modes
  const availableModes = [];
  if (color) availableModes.push({value: 'color', label: __('Color', 'themeplus')});
  if (image) availableModes.push({value: 'image', label: __('Image', 'themeplus')});
  if (gradient) availableModes.push({value: 'gradient', label: __('Gradient', 'themeplus')});

  // If no modes specified, default to color
  const modes = availableModes.length > 0 ? availableModes : [
    {value: 'color', label: __('Color', 'themeplus')}
  ];

  const [activeMode, setActiveMode] = useState(value.mode || modes[0].value);

  const handleChange = (key, val) => {
    onChange({
      ...value,
      [key]: val,
      mode: activeMode,
    });
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    onChange({
      ...value,
      mode: mode,
    });
  };

  // Background size options
  const sizeOptions = {
    cover: __('Cover', 'themeplus'),
    contain: __('Contain', 'themeplus'),
    auto: __('Auto', 'themeplus'),
  };

  // Background repeat options
  const repeatOptions = {
    'no-repeat': __('No Repeat', 'themeplus'),
    repeat: __('Repeat', 'themeplus'),
    'repeat-x': __('Repeat X', 'themeplus'),
    'repeat-y': __('Repeat Y', 'themeplus'),
  };

  // Background attachment options
  const attachmentOptions = {
    scroll: __('Scroll', 'themeplus'),
    fixed: __('Fixed', 'themeplus'),
  };

  // Background position options
  const positionOptions = {
    'left top': __('Left Top', 'themeplus'),
    'left center': __('Left Center', 'themeplus'),
    'left bottom': __('Left Bottom', 'themeplus'),
    'center top': __('Center Top', 'themeplus'),
    'center center': __('Center', 'themeplus'),
    'center bottom': __('Center Bottom', 'themeplus'),
    'right top': __('Right Top', 'themeplus'),
    'right center': __('Right Center', 'themeplus'),
    'right bottom': __('Right Bottom', 'themeplus'),
  };

  return (
    <div className="tpo-field tpo-field--background">
      <div className="tpo-field__header">
        <label className="tpo-field__label">{label}</label>
      </div>

      <div className="tpo-field__body">
        <div className="tpo-background tpo-field-card">
          {/* Mode Selector (only if multiple modes) */}
          {modes.length > 1 && (
            <div className="tpo-background__modes">
              <ButtonSet
                label={__('Background Type', 'themeplus')}
                value={activeMode}
                onChange={handleModeChange}
                options={modes}
              />
            </div>
          )}

          {/* Color Mode */}
          {activeMode === 'color' && (
            <div className="tpo-background__color tpo-field--depth0">
              <label className="tpo-field__label--depth0 tpo-background__label">
                {__('Background Color', 'themeplus')}
              </label>
              <ColorPickerButton
                color={value.color || '#ffffff'}
                onChange={(val) => handleChange('color', val)}
              />
            </div>
          )}

          {/* Image Mode */}
          {activeMode === 'image' && (
            <div className="tpo-field__options tpo-background__image-options">
              {/* Image Upload */}
              <div className="tpo-field--depth0 tpo-background__option">
                <label className="tpo-field__label--depth0 tpo-background__label">
                  {__('Background Image', 'themeplus')}
                </label>
                <ImageField
                  id={`${id}_image`}
                  value={value.image || ''}
                  onChange={(val) => handleChange('image', val)}
                />
              </div>

              {/* Image Position */}
              {position && (
                <div className="tpo-field--depth0 tpo-background__option">
                  <label className="tpo-field__label--depth0 tpo-background__label">
                    {__('Position', 'themeplus')}
                  </label>
                  <Select
                    value={value.position || 'center center'}
                    onChange={(val) => handleChange('position', val)}
                    options={Object.entries(positionOptions).map(([val, label]) => ({
                      value: val,
                      label: label
                    }))}
                  />
                </div>
              )}

              {/* Image Size */}
              {size && (
                <div className="tpo-field--depth0 tpo-background__option">
                  <ButtonSet
                    label={__('Size', 'themeplus')}
                    value={value.size || 'cover'}
                    onChange={(val) => handleChange('size', val)}
                    options={sizeOptions}
                  />
                </div>
              )}

              {/* Image Repeat */}
              {repeat && (
                <div className="tpo-field--depth0 tpo-background__option">
                  <label className="tpo-field__label--depth0 tpo-background__label">
                    {__('Repeat', 'themeplus')}
                  </label>
                  <Select
                    value={value.repeat || 'no-repeat'}
                    onChange={(val) => handleChange('repeat', val)}
                    options={Object.entries(repeatOptions).map(([val, label]) => ({
                      value: val,
                      label: label
                    }))}
                  />
                </div>
              )}

              {/* Image Attachment */}
              {attachment && (
                <div className="tpo-field--depth0 tpo-background__option">
                  <ButtonSet
                    label={__('Attachment', 'themeplus')}
                    value={value.attachment || 'scroll'}
                    onChange={(val) => handleChange('attachment', val)}
                    options={attachmentOptions}
                  />
                </div>
              )}
            </div>
          )}

          {/* Gradient Mode */}
          {activeMode === 'gradient' && (
            <div className="tpo-background__gradient">
              <GradientPicker
                label={__('Background Gradient', 'themeplus')}
                value={value.gradient || ''}
                onChange={(val) => handleChange('gradient', val)}
                showPreview={true}
                showCopyButton={false}
                showOutput={false}
              />
            </div>
          )}
        </div>
      </div>

      {help && <div className="tpo-field__help">{help}</div>}
    </div>
  );
}

export default BackgroundField;