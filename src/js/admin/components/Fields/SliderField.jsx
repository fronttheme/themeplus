/**
 * ThemePlus Slider Field - Range input with visual feedback
 *
 * File: src/js/admin/components/Fields/SliderField.jsx
 */

import {useState} from '@wordpress/element';

function SliderField({
                       id,
                       label,
                       value = 0,
                       onChange,
                       min = 0,
                       max = 100,
                       step = 1,
                       unit = '',
                       showTooltip = true,
                       help = '',
                     }) {
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage for visual feedback
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    const newValue = Number(e.target.value);

    // Clamp value between min and max
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="tpo-field tpo-field--slider">
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-slider">
          <div
            className="tpo-slider__wrapper"
            onMouseEnter={() => showTooltip && setIsDragging(true)}
            onMouseLeave={() => showTooltip && setIsDragging(false)}
          >
            <input
              id={id}
              name={id}
              type="range"
              className="tpo-slider__input"
              value={value}
              onChange={handleChange}
              onMouseDown={() => showTooltip && setIsDragging(true)}
              onMouseUp={() => showTooltip && setIsDragging(false)}
              onTouchStart={() => showTooltip && setIsDragging(true)}
              onTouchEnd={() => showTooltip && setIsDragging(false)}
              min={min}
              max={max}
              step={step}
              style={{
                '--slider-percentage': `${percentage}%`,
              }}
            />

            {/* Tooltip */}
            {showTooltip && isDragging && (
              <div
                className="tpo-slider__tooltip"
                style={{left: `${percentage}%`}}
              >
                {value}{unit}
              </div>
            )}
          </div>

          <div className="tpo-slider__value-display">
            <input
              type="number"
              className="tpo-slider__value-input"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              step={step}
            />
            {unit && <span className="tpo-slider__unit">{unit}</span>}
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

export default SliderField;