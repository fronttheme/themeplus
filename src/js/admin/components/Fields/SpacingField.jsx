/**
 * ThemePlus Spacing Field
 * Margin/Padding controller with link/unlink and unit selector
 *
 * File: src/js/admin/components/Fields/SpacingField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Spinner from '../Common/Spinner';
import Select from '../Common/Select';
import Button from "../Common/Button";

function SpacingField({
                        id,
                        label,
                        value = {},
                        onChange,
                        units = ['px', 'em', 'rem', '%'], // Default units
                        help = ''
                      }) {
  const [spacing, setSpacing] = useState({
    top: value.top || 0,
    right: value.right || 0,
    bottom: value.bottom || 0,
    left: value.left || 0,
    unit: value.unit || 'px', // Add unit to state
  });
  const [linked, setLinked] = useState(false);

  const updateSpacing = (side, val) => {
    const newValue = Number(val) || 0;
    const newSpacing = linked
      ? {
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
        unit: spacing.unit,
      }
      : {...spacing, [side]: newValue};

    setSpacing(newSpacing);
    onChange(newSpacing);
  };

  // Handle unit change
  const handleUnitChange = (newUnit) => {
    const newSpacing = {...spacing, unit: newUnit};
    setSpacing(newSpacing);
    onChange(newSpacing);
  };

  const toggleLink = () => {
    const newLinked = !linked;
    setLinked(newLinked);

    // When linking, set all values to top value
    if (newLinked) {
      const allSame = {
        top: spacing.top,
        right: spacing.top,
        bottom: spacing.top,
        left: spacing.top,
        unit: spacing.unit,
      };
      setSpacing(allSame);
      onChange(allSame);
    }
  };

  // Get max value based on unit
  const getMaxValue = () => {
    switch (spacing.unit) {
      case '%':
        return 100;
      case 'em':
      case 'rem':
        return 20;
      default: // px
        return 200;
    }
  };

  // Get step based on unit
  const getStep = () => {
    switch (spacing.unit) {
      case 'em':
      case 'rem':
        return 0.1;
      default:
        return 1;
    }
  };

  const maxValue = getMaxValue();
  const step = getStep();

  return (
    <div className="tpo-field tpo-field--spacing">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-spacing tpo-field-card">
          <div className="tpo-spacing__controls">
            {/* Top */}
            <div className="tpo-spacing__control">
              <Spinner
                value={spacing.top}
                onChange={(val) => updateSpacing('top', val)}
                min={0}
                max={maxValue}
                step={step}
                placeholder={__('Top', 'themeplus')}
                unit={spacing.unit}
              />
            </div>

            {/* Right */}
            <div className="tpo-spacing__control">
              <Spinner
                value={spacing.right}
                onChange={(val) => updateSpacing('right', val)}
                min={0}
                max={maxValue}
                step={step}
                placeholder={__('Right', 'themeplus')}
                unit={spacing.unit}
                disabled={linked}
              />
            </div>

            {/* Bottom */}
            <div className="tpo-spacing__control">
              <Spinner
                value={spacing.bottom}
                onChange={(val) => updateSpacing('bottom', val)}
                min={0}
                max={maxValue}
                step={step}
                placeholder={__('Bottom', 'themeplus')}
                unit={spacing.unit}
                disabled={linked}
              />
            </div>

            {/* Left */}
            <div className="tpo-spacing__control">
              <Spinner
                value={spacing.left}
                onChange={(val) => updateSpacing('left', val)}
                min={0}
                max={maxValue}
                step={step}
                placeholder={__('Left', 'themeplus')}
                unit={spacing.unit}
                disabled={linked}
              />
            </div>

            {/* Link/Unlink Button */}
            <div className="tpo-spacing__link-wrapper tpo-field-has-btn">
              <Button
                style="plain"
                color="muted"
                onClick={toggleLink}
                className={`tpo-spacing__link ${linked ? 'tpo-spacing__link--active' : ''}`}
                title={linked ? __('Unlink values', 'themeplus') : __('Link values', 'themeplus')}
                ariaLabel={linked ? __('Unlink values', 'themeplus') : __('Link values', 'themeplus')}
                iconOnly={true}>
                <i className={`fa-solid fa-${linked ? 'link' : 'link-slash'}`}/>
              </Button>
            </div>

            {/* Unit Selector */}
            <div className="tpo-spacing__unit tpo-unit-selector">
              <Select
                value={spacing.unit}
                onChange={handleUnitChange}
                options={units.map(unit => ({
                  label: unit,
                  value: unit,
                }))}
                className="tpo-unit-select"
              />
            </div>
          </div>

          {/* Visual representation - LIVE UPDATES */}
          <div className="tpo-spacing__visual">
            <div className="tpo-spacing__visual-box">
              <span className="tpo-spacing__visual-label tpo-spacing__visual-label--top">
                {spacing.top}{spacing.unit}
              </span>
              <span className="tpo-spacing__visual-label tpo-spacing__visual-label--right">
                {spacing.right}{spacing.unit}
              </span>
              <span className="tpo-spacing__visual-label tpo-spacing__visual-label--bottom">
                {spacing.bottom}{spacing.unit}
              </span>
              <span className="tpo-spacing__visual-label tpo-spacing__visual-label--left">
                {spacing.left}{spacing.unit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default SpacingField;