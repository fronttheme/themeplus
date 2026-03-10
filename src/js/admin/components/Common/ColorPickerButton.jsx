/**
 * ThemePlus ColorPickerButton Component
 * Reusable color picker with smart positioning
 *
 * File: src/js/admin/components/Common/ColorPickerButton.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useRef, useEffect, createPortal} from '@wordpress/element';
import {ColorPicker as WPColorPicker} from '@wordpress/components';

/**
 * ColorPickerButton Component
 *
 * @param {Object} props
 * @param {string} props.value - Current color value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.showInput - Show/hide text input (default: true)
 * @param {string} props.ariaLabel - Aria label for button
 * @param {string} props.className - Additional CSS class
 */
function ColorPickerButton({
                             value = '#000000',
                             onChange,
                             placeholder = '#000000',
                             showInput = true,
                             ariaLabel = null,
                             className = '',
                           }) {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({top: 0, left: 0, position: 'bottom'});
  const buttonRef = useRef(null);
  const pickerRef = useRef(null);

  // Smart 3-way positioning: bottom → top → right
  useEffect(() => {
    if (!showPicker || !buttonRef.current) return;

    const calculatePosition = () => {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Get actual picker dimensions
      const pickerHeight = pickerRef.current?.offsetHeight || 450;
      const pickerWidth = 250;

      // Calculate available space on ALL sides
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const spaceRight = window.innerWidth - buttonRect.right;

      const gap = 8;
      const buffer = 20;

      let top, left, position;

      // PRIORITY 1: Try BOTTOM (default)
      if (spaceBelow >= pickerHeight + buffer) {
        position = 'bottom';
        top = buttonRect.bottom + gap;
        left = buttonRect.left;
      }
      // PRIORITY 2: Try TOP
      else if (spaceAbove >= pickerHeight + buffer) {
        position = 'top';
        top = buttonRect.top - pickerHeight - gap;
        left = buttonRect.left;
      }
      // PRIORITY 3: Try RIGHT
      else if (spaceRight >= pickerWidth + buffer) {
        position = 'right';
        top = buttonRect.top;
        left = buttonRect.right + gap;

        // Adjust vertical position
        if (top + pickerHeight > window.innerHeight - buffer) {
          top = window.innerHeight - pickerHeight - buffer;
        }
        if (top < buffer) {
          top = buffer;
        }
      }
      // FALLBACK: Force bottom
      else {
        position = 'bottom';
        top = buttonRect.bottom + gap;
        left = buttonRect.left;

        if (top + pickerHeight > window.innerHeight - buffer) {
          top = window.innerHeight - pickerHeight - buffer;
        }
      }

      // Adjust horizontal position
      if (position !== 'right') {
        if (left + pickerWidth > window.innerWidth - buffer) {
          left = window.innerWidth - pickerWidth - buffer;
        }
        if (left < buffer) {
          left = buffer;
        }
      }

      setPickerPosition({top, left, position});
    };

    setTimeout(calculatePosition, 0);

    // Watch for content changes
    const observer = new MutationObserver(() => {
      setTimeout(calculatePosition, 50);
    });

    if (pickerRef.current) {
      observer.observe(pickerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [showPicker]);

  // Render picker in portal
  const renderPicker = () => {
    if (!showPicker) return null;

    return createPortal(
      <div className={`tpo-color-picker-portal tpo-color-picker--${pickerPosition.position}`}>
        <div
          className="tpo-color-picker__overlay"
          onClick={() => setShowPicker(false)}
        />

        <div
          ref={pickerRef}
          className="tpo-color-picker__modal"
          style={{
            position: 'fixed',
            top: `${pickerPosition.top}px`,
            left: `${pickerPosition.left}px`,
            zIndex: 1000000,
          }}
        >
          <WPColorPicker
            color={value || '#000000'}
            onChangeComplete={(color) => {
              onChange(color.hex);
            }}
            disableAlpha={false}
          />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={`tpo-color tpo-field-color ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className="tpo-color__preview tpo-field-color__preview"
        style={{backgroundColor: value || '#000000'}}
        onClick={() => setShowPicker(!showPicker)}
        aria-label={ariaLabel || __('Pick color', 'themeplus')}
      />

      {showInput && (
        <input
          type="text"
          className="tpo-color__input tpo-field-color__input"
          value={value || ''}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^#[0-9A-F]{0,6}$/i.test(newValue) || newValue === '') {
              onChange(newValue);
            }
          }}
          placeholder={placeholder}
          maxLength={7}
          autoComplete="off"
        />
      )}

      {renderPicker()}
    </div>
  );
}

export default ColorPickerButton;