/**
 * ThemePlus Dimensions Component
 *
 * File: src/js/admin/components/Fields/Dimensions.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Select from '../Common/Select';
import Button from "../Common/Button";

/**
 * Dimensions Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {Object} props.value Dimension values {width, height, unit}
 * @param {Function} props.onChange Change handler
 * @param {Array} props.units Available units
 * @param {Array} props.dimensions Enabled dimensions (width, height)
 * @param {string} props.help Help text
 */
function Dimensions({
                      id,
                      label,
                      value = {},
                      onChange,
                      units = ['px', 'em', '%', 'rem'],
                      dimensions = ['width', 'height'],
                      help = '',
                    }) {
  const [isLinked, setIsLinked] = useState(false);

  const currentUnit = value.unit || 'px';
  const width = value.width || '';
  const height = value.height || '';

  /**
   * Handle dimension change
   */
  const handleDimensionChange = (dimension, newValue) => {
    const updatedValue = {...value, [dimension]: newValue};

    // If linked, update both dimensions
    if (isLinked && dimensions.length > 1) {
      dimensions.forEach(dim => {
        updatedValue[dim] = newValue;
      });
    }

    onChange(updatedValue);
  };

  /**
   * Handle unit change
   */
  const handleUnitChange = (newUnit) => {
    onChange({...value, unit: newUnit});
  };

  return (
    <div className="tpo-field tpo-field--dimensions">
      <div className="tpo-field__header">
        <label className="tpo-field__label">
          {label}
        </label>
      </div>

      <div className="tpo-field__body">
        <div className="tpo-dimensions tpo-field-card">
          {/* Dimensions Inputs */}
          <div className="tpo-dimensions__inputs tpo-field-has-btn">
            {dimensions.includes('width') && (
              <div className="tpo-dimensions__input-wrapper">
                <label className="tpo-dimensions__input-label">
                  {__('Width', 'themeplus')}
                </label>
                <input
                  type="number"
                  className="tpo-dimensions__input"
                  value={width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  placeholder="0"
                />
              </div>
            )}

            {dimensions.includes('height') && (
              <div className="tpo-dimensions__input-wrapper">
                <label className="tpo-dimensions__input-label">
                  {__('Height', 'themeplus')}
                </label>
                <input
                  type="number"
                  className="tpo-dimensions__input"
                  value={height}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                  placeholder="0"
                />
              </div>
            )}

            {/* Link Button (if multiple dimensions) */}
            {dimensions.length > 1 && (
              <Button
                style="plain"
                color="muted"
                className={`tpo-dimensions__link ${
                  isLinked ? 'tpo-dimensions__link--active' : ''
                }`}
                iconOnly={true}
                onClick={() => setIsLinked(!isLinked)}
                ariaLabel={isLinked ? __('Unlink dimensions', 'themeplus') : __('Link dimensions', 'themeplus')}
                title={isLinked ? __('Unlink', 'themeplus') : __('Link', 'themeplus')}
              >
                {isLinked ? <i className="fa-solid fa-link"></i> : <i className="fa-solid fa-link-slash"></i>}
              </Button>
            )}
          </div>

          {/* Unit Selector */}
          <div className="tpo-dimensions__unit tpo-unit-selector">
            <Select
              value={currentUnit}
              onChange={handleUnitChange}
              options={units}
              className="tpo-unit-select"
            />
          </div>

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

export default Dimensions;